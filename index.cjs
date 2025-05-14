const babelParser = require("prettier/parser-babel");
const typescriptParser = require("prettier/parser-typescript");
const { transformTailwindClassesInText } = require("./transform.cjs");

module.exports = {
  parsers: {
    babel: {
      ...babelParser.parsers.babel,
    },
    typescript: {
      ...typescriptParser.parsers.typescript,
    },
    tsx: {
      ...typescriptParser.parsers.tsx,
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
  printers: {
    estree: {
      print: (path, options, print) => {
        return path.call(print, "body");
      },
    },
  },
  postprocess: (text) => {
    return transformTailwindClassesInText(text);
  },
};
