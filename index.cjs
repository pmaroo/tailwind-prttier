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
    typescriptreact: {
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
      name: "TypeScript React",
      parsers: ["typescriptreact"],
      extensions: [".tsx"],
    },
  ],
};
