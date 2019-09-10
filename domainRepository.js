const Domain = require('./domain');

class DomainRepository {
    constructor(handler) {
        this.handler = handler
    }
    
    async fetch(domain) {
        const data = await this.handler.fetch(domain)
        return new Domain(data['domain'], data['ur'], data['dr'])
    }
}

module.exports = DomainRepository;

