class DataGenerator {
    constructor() {
        this.operations = new Map([
            ['AND', (fst, scnd) => fst & scnd],
            ['OR', (fst, scnd) => fst | scnd],
            ['XOR', (fst, scnd) => fst ^ scnd],
        ]);
    }
    
    randomBinaryValue() {
        return Math.floor(Math.random() * 2);
    }

    generateData(operationName) {
        const input = [ 
            this.randomBinaryValue(),
            this.randomBinaryValue(),
        ];
        
        const operation = this.operations.get(operationName);

        return operation ? {
            input,
            output: [ operation(input[0], input[1]) ],
        } : {};
    }
}

export default DataGenerator;