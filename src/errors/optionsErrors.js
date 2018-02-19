const HEADER = "Options error:\n";

const inputNotSpecifiedError = () => {
  return new Error(
    `${HEADER} Input file was not specified, use --input <file> or -i <file>`
  );
};

const inputDoesNotExistError = fileName => {
  return new Error(`${HEADER} Input file "${fileName}" does not exist`);
};

module.exports = {
  inputNotSpecifiedError,
  inputDoesNotExistError
};
