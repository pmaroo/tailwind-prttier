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
        return match; // 변환 실패 시 원본 반환
      }
    })

    // className={`...`} 처리 (템플릿 리터럴)
    .replace(/class(?:Name)?=\{\`([\s\S]*?)\`\}/g, (match, content, offset) => {
      try {
        const indent = getIndent(text, offset);
        const transformed = transformTemplateLiteral(content, indent + "  ");
        return `className={\`\n${transformed}\n${indent}\`}`;
      } catch (e) {
        console.error("Error in className={`...`} replacement:", e);
        return match;
      }
    });
}

function transformTemplateLiteral(content, indent = "  ") {
  const regex = /(\$\{[^}]+\})|([^$]+)/g;
  const parts = [];

  let match;
  while ((match = regex.exec(content)) !== null) {
    const [full, expr, plain] = match;
    if (expr) {
      parts.push(expr); // ${...} 유지
    } else if (plain) {
      const sorted = sortAndFormatClassList(plain, indent);
      parts.push(sorted);
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
