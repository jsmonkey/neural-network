class DataGenerator {
    randomBinaryValue() {
        return Math.floor(Math.random() * 2);
    }

    generateANDData() {
        const input = [ 
            this.randomBinaryValue(),
            this.randomBinaryValue(),
        ];

        return {
            input,
            output: [ input[0] & input[1] ],
        };
    }

    generateORData() {
        const input = [ 
            this.randomBinaryValue(),
            this.randomBinaryValue(),
        ];

        return {
            input,
            output: [ input[0] || input[1] ],
        };
    }
}

export default DataGenerator;