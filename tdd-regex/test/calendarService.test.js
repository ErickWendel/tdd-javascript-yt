const { createSandbox } = require('sinon')
const { describe, it, before, afterEach } = require('mocha')
const { expect } = require('chai')
const CalendarService = require('../src/calendarService')


describe('calendarService', () => {
    let sandbox
    before(() => {
        sandbox = createSandbox()    
    })

    afterEach(() => {
        sandbox.reset()
    })

    describe('should validate data input', () => {
        it('should return true when sending dd/mm/yyyy')
        it('should return false when sending yyyy/mm/dd')
        it('should return false when sending yyyy-mm-dd')

        it('should return true when sending future date and time on from and to properties')

        it('should return false when sending past date and time on "from" and "to" properties')
        it('should return false when the "to" property is lower than the "from" property')
    })


    describe('register schedule', () => {
        it('should return an error when scheduling an unavailable time slot')
        it('should return the transaction summary when scheduling an available time slot')
    })


})