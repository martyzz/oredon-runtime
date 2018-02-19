const commandLineArgs = require("command-line-args");
const commandLineUsage = require("command-line-usage");
const fs = require("fs");
const {
  inputNotSpecifiedError,
  inputDoesNotExistError
} = require("../errors/optionsErrors");

const setupOptions = () => {
  const optionDefinitions = [
    {
      name: "help",
      alias: "h",
      type: Boolean,
      description: "Display this usage guide"
    },
    {
      name: "input",
      alias: "i",
      type: String,
      multiple: false,
      description: "File with Oredon instructions",
      typeLabel: "<file>"
    }
  ];

  return commandLineArgs(optionDefinitions);
};

const printOptionsUsage = () => {
  console.log(
    commandLineUsage([
      {
        header: "Oredon Compiler",
        content:
          "Runtime for Oredon programming language, takes input file with Oredon instructions and runs them"
      },
      {
        header: "Options",
        optionList: optionDefinitions
      },
      {
        content:
          "Project home: [underline]{https://github.com/martyzz/oredon-compiler}"
      }
    ])
  );
};

const verifyOptions = (input, output) => {
  if (!input) throw inputNotSpecifiedError();
  if (!fs.existsSync(input)) throw inputDoesNotExistError(input);
};

module.exports = {
  setupOptions,
  printOptionsUsage,
  verifyOptions
};
