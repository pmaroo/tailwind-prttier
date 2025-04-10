const { transformTailwindClassesInText } = require("./transform.cjs");
const babelParser = require("prettier/parser-babel");
const typescriptParser = require("prettier/parser-typescript");
module.exports = {
  parsers: {
    babel: {
      ...babelParser.parsers.babel,
      preprocess(text) {
        return transformTailwindClassesInText(text);
      },
    },
    typescript: {
      ...typescriptParser.parsers.typescript,
      preprocess(text) {
        return transformTailwindClassesInText(text);
      },
    },
    tsx: {
      ...typescriptParser.parsers.tsx,
      preprocess(text) {
        return transformTailwindClassesInText(text);
      },
    },
  },
  languages: [
    {
      name: "JavaScript",
      parsers: ["babel"],
      extensions: [".js", ".jsx"],
    },
    {
      name: "TypeScript",
      parsers: ["typescript"],
      extensions: [".ts"],
    },
    {
      name: "TypeScript TSX",
      parsers: ["tsx"],
      extensions: [".tsx"],
    },
  ],
};
