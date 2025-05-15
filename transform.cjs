const { tailwindOrder } = require("./tailwind-order.cjs");

function transformTailwindClassesInText(text) {
  if (typeof text !== "string") return text;

  return text
    // class="..." 또는 className="..." 처리
    .replace(/class(?:Name)?="([^"]*)"/g, (match, classNames, offset) => {
      try {
        const indent = getIndent(text, offset);
        const sorted = sortAndFormatClassList(classNames, indent + "  ");
        return `className="\n${sorted}\n${indent}"`;
      } catch (e) {
        console.error("Error in className=\"\" replacement:", e);
        return match;
      }
    })

    // className={`...`} 처리 (템플릿 리터럴)
   .replace(/class(?:Name)?=\{\`([\s\S]*?)\`\}/g, (match, content, offset) => {
  try {
    const tagIndent = getTagStartIndent(text, offset);
    const indentInsideTemplate = tagIndent + "  "; // 태그 시작 들여쓰기 + 2칸
    const transformed = transformTemplateLiteral(content, indentInsideTemplate);
    return `className={\`\n${transformed}\n${tagIndent}\`}`;
  } catch (e) {
    console.error("Error in className={`...`} replacement:", e);
    return match;
  }
});
}

// 수정된 transformTemplateLiteral 함수
function transformTemplateLiteral(content, baseIndent = "  ") {
  const regex = /(\$\{[^}]+\})|([^$]+)/g;
  const parts = [];

  let match;
  while ((match = regex.exec(content)) !== null) {
    const [full, expr, plain] = match;
    if (expr) {
      // ${...}도 baseIndent로만 들여쓰기
      parts.push(baseIndent + expr.trim());
    } else if (plain) {
      // 일반 문자열은 각 줄별로 trim 후 붙이기
      const lines = plain.split("\n").map(line => line.trim()).filter(Boolean);
      const sortedLines = sortAndFormatClassList(lines.join(" "), baseIndent);
      parts.push(sortedLines);
    }
  }

  return parts.join("\n");
}

function sortAndFormatClassList(classStr, indent = "  ") {
  if (typeof classStr !== "string") return "";

  const classList = classStr
    .replace(/\n/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  const ordered = classList.sort((a, b) => {
    const prefixA = getMediaPrefix(a);
    const prefixB = getMediaPrefix(b);
    const baseA = getBaseClass(a);
    const baseB = getBaseClass(b);

    const prefixOrderA = mediaPrefixOrder.indexOf(prefixA);
    const prefixOrderB = mediaPrefixOrder.indexOf(prefixB);

    if (prefixOrderA !== prefixOrderB) {
      return (prefixOrderA === -1 ? 9999 : prefixOrderA) - (prefixOrderB === -1 ? 9999 : prefixOrderB);
    }

    const baseOrderA = tailwindOrder.indexOf(baseA);
    const baseOrderB = tailwindOrder.indexOf(baseB);

    return (baseOrderA === -1 ? 9999 : baseOrderA) - (baseOrderB === -1 ? 9999 : baseOrderB);
  });

  return ordered.map(cls => `${indent}${cls}`).join("\n");
}

function getIndent(text, offset) {
  const before = text.slice(0, offset);
  const lastLine = before.split("\n").pop();
  return lastLine.match(/^\s*/)?.[0] || "";
}

function getTagStartIndent(text, offset) {
  // offset: className={` 위치
  // offset 위치에서 거꾸로 올라가서 <태그 시작 위치 찾기
  const before = text.slice(0, offset);
  const lines = before.split("\n");
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].includes("<")) {
      // 해당 줄의 들여쓰기 반환
      return lines[i].match(/^\s*/)?.[0] || "";
    }
  }
  return "";
}

const mediaPrefixOrder = [
  "", "sm", "md", "lg", "xl", "2xl",
  "hover", "focus", "active", "disabled",
];

function getMediaPrefix(cls) {
  const parts = cls.split(":");
  return parts.length > 1 ? parts[0] : "";
}

function getBaseClass(cls) {
  return cls.split(":").pop();
}

module.exports = { transformTailwindClassesInText };
