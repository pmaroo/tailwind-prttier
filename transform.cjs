// prettier-plugin-tailwind-autoline/transform.js
const { tailwindOrder } = require("./tailwind-order.cjs");

function transformTailwindClassesInText(text) {
    return text.replace(/class(?:Name)?="([^"]+)"/g, (match, classNames, offset) => {
      // 줄의 앞쪽 들여쓰기 계산
      const before = text.slice(0, offset);
      const lastLine = before.split("\n").pop();
      const indent = lastLine.match(/^\s*/)?.[0] || "";
  
      // 원하는 들여쓰기: 기존 indent + 2칸
      const innerIndent = indent + "  ";
  
      const sorted = sortAndFormatClassList(classNames, innerIndent);
      return `className="\n${sorted}\n${indent}"`;
    });
  }

  const mediaPrefixOrder = [
    "",       // no prefix
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
    "hover",
    "focus",
    "active",
    "disabled",
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
