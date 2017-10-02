const training_set = require('../training-set.json');
const Net = require('./Net.mjs');

const { topology, imput_num, data_set } = training_set;
const net = new Net(topology, imput_num);

data_set.forEach((data, i) => {
    net.feedForward(data.input);
    net.backPropagation(data.output);

    const report = `
    Iteration: ${i}
    Inputs: ${data.input}
    Output: ${data.output}
    Net output: ${net.getOutput()}
    Net error: ${net.error}`

    console.log(report);
});