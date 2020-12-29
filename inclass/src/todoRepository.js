const loki = require('lokijs')

class TodoRepository {
    constructor() {
        const db = new loki('todo', { indices: ['from', 'to'] });
        this.schedule = db.addCollection('schedule');
    }

    create(data) {
        return this.schedule.insertOne(data)
    }
    
    list(query) {
        return this.schedule.find(query)
    }
}

module.exports = TodoRepository

// const c = new TodoRepository()

// c.insert({ name: 'mjolnir', owner: 'thor', maker: 'dwarves', to: new Date(), from: new Date() });
// c.insert({ name: 'gungnir', owner: 'odin', maker: 'elves' , to: new Date(), from: new Date()});
// c.insert({ name: 'tyrfing', owner: 'Svafrlami', maker: 'dwarves' , to: new Date(), from: new Date()});
// c.insert({ name: 'draupnir', owner: 'odin', maker: 'elves' , to: new Date(), from: new Date()});

// console.log('findOne', c.find({ 'name': 'tyrfing' }))
// console.log('find', c.find())
