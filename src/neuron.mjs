class Neuron {
   
    constructor(isBiasNeuron = false) {
        this.isBiasNeuron = isBiasNeuron;
        this.input_connections = [];
        this.output_connections = [];
        this.input_value = 0;
        this.output_value = 1;
        this.error = 0;

        this.learning_rate = 0.15;
        this.momentum = 0.5;
    }

    feedForward() {
        this.input_value = this.input_connections.reduce((sum, conn) => {
            return sum + conn.from.output_value * conn.weight;
        }, 0);
    
        this.output_value = this.activationFunction(this.input_value);
    }

    activationFunction(x) {
        return 1 / (1 + Math.exp(-x));
    }

    activationFunctionDerivative(x) {
        return this.activationFunction(x) * (1 - this.activationFunction(x));
    }

    calcOutputError(target_value) {
        this.error = (target_value - this.output_value) * this.activationFunctionDerivative(this.input_value);
    }

    calcHiddenError() {
        this.error = this.calcNextLayerError() * this.activationFunctionDerivative(this.input_value);
    }

    calcNextLayerError() {
        return this.output_connections.reduce((sum, conn) => {
            return sum + conn.to.error * conn.weight;
        }, 0);
    }

    updateInputConnectionsWeigths() {
        this.input_connections.forEach(conn => {
            const delta_weight = this.learning_rate * this.error * conn.from.output_value + this.momentum * conn.deltaWeight;
            conn.deltaWeight = delta_weight;
            conn.weight += delta_weight;  
        });
    }
}

export default Neuron;