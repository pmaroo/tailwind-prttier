const babelParser = require("prettier/parser-babel");
const typescriptParser = require("prettier/parser-typescript");
const { transformTailwindClassesInText } = require("./transform.cjs");

module.exports = {
  parsers: {
    babel: {
      ...babelParser.parsers.babel,
      preprocess: (text, options) => transformTailwindClassesInText(text),
    },
    typescript: {
      ...typescriptParser.parsers.typescript,
      preprocess: (text, options) => transformTailwindClassesInText(text),
    },
    tsx: {
      ...typescriptParser.parsers.tsx,
      preprocess: (text, options) => transformTailwindClassesInText(text),
    },
  },
};
