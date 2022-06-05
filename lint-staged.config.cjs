const micromatch = require('micromatch');
const prettier = require('prettier');

// Figure out all extensions supported by Prettier.
const prettierSupportedExtensions = prettier
  .getSupportInfo()
  .languages.map(({ extensions }) => extensions)
  .flat();

const addQuotes = (a) => `"${a}"`;

module.exports = (allStagedFiles) => {
  // Match files for ESLint including dirs and files starting with dot.
  const eslintFiles = micromatch(allStagedFiles, ['**/*.{js,jsx,ts,tsx'], {
    dot: true,
  });

  // Match files for Prettier including dirs and files starting with dot.
  const prettierFiles = micromatch(
    allStagedFiles,
    prettierSupportedExtensions.map((extension) => `**/*${extension}`),
    { dot: true }
  );

  // Array of linters to be run in this sequence.
  const linters = [];

  // Add linters only when there are staged files for them.
  // 'prettier --write' causes lint-staged to never terminate when prettierFiles is empty.

  if (eslintFiles.length > 0) linters.push(`eslint --fix ${eslintFiles.join(' ')}`);

  if (prettierFiles.length > 0) linters.push(`prettier --write ${prettierFiles.map(addQuotes).join(' ')}`);

  return linters;
};
