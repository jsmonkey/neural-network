const DataGenerator = require('./data-generator.js');
const Net = require('./net.js');

const topology = [2, 3, 2, 1];
const iterations =30000;

const data_generator = new DataGenerator();
const net = new Net(topology);

for(let i=0; i < iterations; i++) {
    const data = data_generator.generateANDData();

    net.feedForward(data.input);
    net.backPropagation(data.output);

    const report = `
    Iteration: ${i}
    Inputs: ${data.input}
    Output: ${data.output}
    Net output: ${net.getOutput()}
    Net error: ${net.error}`

    console.log(report);
}