class Domain {
    constructor(name, ur, dr) {
        this.name = name
        this.ur = ur
        this.dr = dr
    }
    
    name() {
        return this.name
    }
    
    ur() {
        return this.ur
    }
    
    dr() {
        return this.dr
    }
}

module.exports = Domain;

