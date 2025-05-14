const { tailwindOrder } = require("./tailwind-order.cjs");

function transformTailwindClassesInText(text) {
  return text
    // className="..." 처리
    .replace(/class(?:Name)?="([^"]+)"/g, (match, classNames, offset) => {
      const indent = getIndent(text, offset);
      const sorted = sortAndFormatClassList(classNames, indent + "  ");
      return `className="\n${sorted}\n${indent}"`;
    })

    // className={`...`} 처리
    .replace(/class(?:Name)?=\{\`([\s\S]*?)\`\}/g, (match, content, offset) => {
      const indent = getIndent(text, offset);
      const transformed = transformTemplateLiteral(content, indent + "  ");
      return `className={\`\n${transformed}\n${indent}\`}`;
    });
}

function transformTemplateLiteral(content, indent = "  ") {
  const regex = /\$\{[^}]+\}|[^\$]+/g;  // ${} 내부와 그 외 텍스트 분리
  const parts = [];

  let match;
  while ((match = regex.exec(content)) !== null) {
    const part = match[0];
    if (part.startsWith("${")) {
      parts.push(part); // ${}는 그대로 두기
    } else {
      const sorted = sortAndFormatClassList(part, indent); // 클래스 정렬
      parts.push(sorted);
    }
  }

  return parts.join("\n");  // 재조합
}

function sortAndFormatClassList(classStr, indent = "  ") {
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
