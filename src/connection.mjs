class Connection {
    constructor(weight, from, to) {
        this.weight = weight;
        this.delta_weight = 0;
        this.from = from;
        this.to = to;
    }
}

export default Connection;