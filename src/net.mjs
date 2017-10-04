import Neuron from './neuron';
import Connection from './connection';

class Net {
    constructor(topology) {
        this.layers = [];
        this.bias_neurons = [];
        this.error = 0;
        this._createLayers(topology);
    }

    _createLayers(topology) {

        const input_layer = [];
        const inputs_num = topology[0];

        for(let i = 0; i < inputs_num; i++) {
            input_layer.push({ 
                output_value: 0,
                output_connections: [],
             });
        }
        
        this.layers.push(input_layer);

        for(let i = 1; i < topology.length; i++) {
            this.layers[i] = [];

            const neurons_num = topology[i];

            const prev_layer = this.layers[i - 1];

            for(let j = 0; j < neurons_num; j++) {
                const neuron = new Neuron();

                for(let k = 0; k < prev_layer.length; k++) {
                    const prev_data_source = prev_layer[k];

                    const connection = new Connection(Math.random(), prev_data_source, neuron);

                    prev_data_source.output_connections.push(connection);
                    neuron.input_connections.push(connection);
                }

                this.layers[i].push(neuron);
            }
        }

        this._addBiasNeurons(topology, this.layers);
    }

    _addBiasNeurons(topology, layers) {
        for(let i = 1; i < topology.length - 1; i++) {
            const layer = layers[i];
            const bias_neuron = new Neuron(true);
            for(let j = 0; j < layer.length; j++) {
                const neuron = layer[j];
                const connection = new Connection(Math.random(), bias_neuron, neuron);
                bias_neuron.output_connections.push(connection);
                neuron.input_connections.push(connection);
            }
            this.bias_neurons.push(bias_neuron);
        }
    }

    feedForward(input_data) {
        const input_layer = this.layers[0];

        for(let i = 0; i < input_data.length; i++) {
            const input_data_value = input_data[i];
            const input = input_layer[i];
            input.output_value = input_data_value;
        }

        for(let i = 1; i < this.layers.length; i++) {
            const layer = this.layers[i];
            for(let j = 0; j < layer.length; j++) {
                const neuron = layer[j];
                neuron.feedForward();
            }
        }
    }

    backPropagation(target_values) {
        const output_layer = this.layers[this.layers.length - 1];
        let squareError = 0;
        for(let i = 0; i < output_layer.length; i++) {
            const delta = target_values[i] - output_layer[i].output_value
            squareError += delta * delta;
        }
        const rmse = Math.sqrt(squareError / output_layer.length);
        this.error = rmse;

        for(let i = 0; i < output_layer.length; i++) {
            const neuron = output_layer[i];
            neuron.calcOutputError(target_values[i]);
        }

        for(let i = this.layers.length - 2; i > 1; i--) {
            const layer = this.layers[i];
            for(let j = 0; j < layer.length; j++) {
                const neuron = layer[j];
                neuron.calcHiddenError();
            }
        }

        for(let i = this.layers.length - 1; i > 1; i--) {
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