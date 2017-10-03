class Connection {
    constructor(weight, from, to) {
        this.weight = weight;
        this.deltaWeight = 0;
        this.from = from;
        this.to = to;
    }
}

export default Connection;