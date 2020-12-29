const loki = require('lokijs')

class CalendarRepository {
    constructor() {
        const db = new loki('calendar', { indices: ['from', 'to'] });
        this.schedule = db.addCollection('schedule');
    }

    create(data) {
        return this.schedule.insertOne(data)
    }
    
    list(query) {
        return this.schedule.find(query)
    }
}

module.exports = CalendarRepository

const c = new CalendarRepository()

// c.insert({ name: 'mjolnir', owner: 'thor', maker: 'dwarves', to: new Date(), from: new Date() });
// c.insert({ name: 'gungnir', owner: 'odin', maker: 'elves' , to: new Date(), from: new Date()});
// c.insert({ name: 'tyrfing', owner: 'Svafrlami', maker: 'dwarves' , to: new Date(), from: new Date()});
// c.insert({ name: 'draupnir', owner: 'odin', maker: 'elves' , to: new Date(), from: new Date()});

// console.log('findOne', c.find({ 'name': 'tyrfing' }))
// console.log('find', c.find())
