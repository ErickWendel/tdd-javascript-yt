const { createSandbox } = require('sinon')
const { describe, it, before, afterEach } = require('mocha')
const { expect } = require('chai')
const TodoRepository = require('../src/todoRepository')

describe('todoRepository', () => {
    let sandbox
    let todoRepository
    before(() => {
        sandbox = createSandbox()
        todoRepository = new TodoRepository()
    })

    afterEach(() => {
        sandbox.reset()
    })

    it('should call inserOne from lokijs', () => {

        const functionName = "insertOne"

        sandbox.stub(
            todoRepository.schedule,
            functionName,
        ).returns(true)

        const data = { name: 'Erick' }
        const result = todoRepository.create(data)


        expect(result).to.be.ok
        expect(todoRepository.schedule[functionName].calledOnceWithExactly(data)).to.be.ok
    })
    
    it('should call find from lokijs', () => {

        const functionName = "find"
        const data = { name: 'Erick' }

        sandbox.stub(
            todoRepository.schedule,
            functionName,
        ).returns([data])

        const result = todoRepository.list(data)

        
        expect(result).to.be.ok
        expect(todoRepository.schedule[functionName].calledOnceWithExactly(data)).to.be.ok
    })
})