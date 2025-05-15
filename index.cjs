const babelParser = require("prettier/parser-babel");
const typescriptParser = require("prettier/parser-typescript");
const { transformTailwindClassesInText } = require("./transform.cjs");

module.exports = {
  parsers: {
    babel: {
      ...babelParser.parsers.babel,
      preprocess: (text, options) => {
        try {
          const transformed = transformTailwindClassesInText(text);
          return typeof transformed === "string" ? transformed : text;
        } catch (e) {
          console.error("Error in preprocess (babel):", e);
          return text;
        }
      },
    },
    typescript: {
      ...typescriptParser.parsers.typescript,
      preprocess: (text, options) => {
        try {
          const transformed = transformTailwindClassesInText(text);
          return typeof transformed === "string" ? transformed : text;
        } catch (e) {
          console.error("Error in preprocess (typescript):", e);
          return text;
        }
      },
    },
    tsx: {
      ...typescriptParser.parsers.tsx,
      preprocess: (text, options) => {
        try {
          const transformed = transformTailwindClassesInText(text);
          return typeof transformed === "string" ? transformed : text;
        } catch (e) {
          console.error("Error in preprocess (tsx):", e);
          return text;
        }
      },
    },
  },
};
