const fs = require("fs");
const measure = require("./src/utilities/measure");
const {
  setupOptions,
  printOptionsUsage,
  verifyOptions
} = require("./src/utilities/options");

//const readline = require("readline");

/*const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});*/

const { input, help } = setupOptions();

if (help) {
  printOptionsUsage();
  return;
}

try {
  verifyOptions(input);

  console.log(`Reading input file "${input}"...`);
  const oreScript = fs.readFileSync(input, "utf8");

  console.log(`Runtime...`);
  const start = measure();

  /*rl.question("What do you think of Node.js? ", answer => {
    // TODO: Log the answer in a database
    console.log(`Thank you for your valuable feedback: ${answer}`);

    rl.close();
  });*/

  const duration = measure(start);
  console.log(`Runtime finished! (${duration} ms)`);
} catch (error) {
  console.error(error.message);
}
