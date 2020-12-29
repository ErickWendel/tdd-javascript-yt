const { createSandbox } = require('sinon')
const { describe, it, before, afterEach } = require('mocha')
const { expect } = require('chai')
const CalendarRepository = require('../src/calendarRepository')

describe('calendarRepository', () => {
    let sandbox
    let calendarRepository
    before(() => {
        sandbox = createSandbox()
        calendarRepository = new CalendarRepository()
    })

    afterEach(() => {
        sandbox.reset()
    })

    it('should call inserOne from lokijs', () => {

        const functionName = "insertOne"

        sandbox.stub(
            calendarRepository.schedule,
            functionName,
        ).returns(true)

        const data = { name: 'Erick' }
        const result = calendarRepository.create(data)


        expect(result).to.be.ok
        expect(calendarRepository.schedule[functionName].calledOnceWithExactly(data)).to.be.ok
    })
    
    it('should call find from lokijs', () => {

        const functionName = "find"
        const data = { name: 'Erick' }

        sandbox.stub(
            calendarRepository.schedule,
            functionName,
        ).returns([data])

        const result = calendarRepository.list(data)

        
        expect(result).to.be.ok
        expect(calendarRepository.schedule[functionName].calledOnceWithExactly(data)).to.be.ok
    })
})