import Neuron from './Neuron';
import Connection from './Connection';

class Net {

    layers = [];
    error = 0;

    constructor(topology, input_data_num) {
       this.createLayers(topology, input_data_num);
    }

    createLayers(topology, input_data_num) {
        for(let i = 0; i < topology.length; i++) {
            this.layers[i] = [];
            const neurons_num = topology[i];
            const prev_layer = this.layers[i - 1];

            for(let j = 0; j < neurons_num; j++) {
                const neuron = new Neuron();
                
                const num = prev_layer ? prev_layer.length : input_data_num;

                for(let k = 0; k < num; k++) {
                    console.log(prev_layer ? prev_layer.length : input_data_num);
                    const prevSource = prev_layer ? prev_layer[k] : {
                        output_value: Math.random(),
                    };

                    const connection = new Connection(Math.random(), prevSource, neuron);

                    if(prev_layer) prevSource.output_connections.push(connection);
                    neuron.input_connections.push(connection);
                }

                this.layers[i].push(neuron);
            }
        }
    }

    feedForward(input_data) {
        const input_layer = this.layers[0];

        for(let i = 0; i < input_data.length; i++) {
            const input_value = input_data[i];
            for(let j = 0; j < input_layer.length; j++) {
                const neuron = input_layer[j];
                neuron.input_connections[i].from.output_value = input_value;
            }
        }

        for(let i = 0; i < this.layers.length; i++) {
            const layer = this.layers[i];
            for(let j = 0; j < layer.length; j++) {
                const neuron = layer[j];
                neuron.feedForward();
            }
        }
    }

    backPropagation(target_values) {
        const output_layer = this.layers[this.layers.length - 1];
        const squareError = 0;
        for(let i = 0; i < output_layer.length; i++) {
            const delta = target_values[i] - output_layer[i]
            this.squareError += delta * delta;
        }
        const rmse = Math.sqrt(squareError / output_layer.length);
        this.error = rmse;

        for(let i = 0; i < output_layer.length; i++) {
            const neuron = output_layer[i];
            neuron.calcOutputError(target_values[i]);
        }

        for(let i = this.layers.length - 2; i > 0; i--) {
            const layer = this.layers[i];
            for(let j = 0; j < layer.length; j++) {
                const neuron = layer[j];
                neuron.calcHiddenError();
            }
        }

        for(let i = this.layers.length - 1; i > 0; i--) {
            const layer = this.layers[i];
            for(let j = 0; j < layer.length; j++) {
                const neuron = layer[j];
                neuron.updateInputConnectionsWeigths();
            }
        }
    }

    getOutput() {
        const output_layer = this.layers[this.layers.length - 1];
        return output_layer.map(neuron => neuron.output_value);
    }
}

export default Net;