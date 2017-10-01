import training_set from '../training-set';
import Net from './Net';

const { topology, imput_num, data_set } = training_set;
const net = new Net(topology, imput_num);

data_set.forEach(data => {
    net.feedForward(data.input);

    console.log(`Inputs: ${data.input}`);
    console.log(`Output: ${data.output}`);
    console.log(`Net output: ${net.getOutput()}`);
    net.backPropagation(data.output);
});