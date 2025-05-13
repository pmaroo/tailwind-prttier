const { tailwindOrder } = require("./tailwind-order.cjs");

function transformTailwindClassesInText(text) {
  return text
    // "..." 처리
    .replace(/class(?:Name)?="([^"]+)"/g, (match, classNames, offset) => {
      const indent = getIndent(text, offset);
      const sorted = sortAndFormatClassList(classNames, indent + "  ");
      return `className="\n${sorted}\n${indent}"`;
    })
    // {`...`} 처리 (줄바꿈 허용)
    .replace(/class(?:Name)?=\{\`([\s\S]*?)\`\}/g, (match, classNames, offset) => {
      const indent = getIndent(text, offset);
      const sorted = sortAndFormatClassList(classNames, indent + "  ");
      return `className={\`\n${sorted}\n${indent}\`}`;
    });
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

function sortAndFormatClassList(classStr, indent = "  ") {
  const classList = classStr.trim().split(/\s+/);

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

module.exports = { transformTailwindClassesInText };
