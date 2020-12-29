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
        sandbox.restore()
    })
    
    describe('methods signature', () => {

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
            const expectedReturn = [{ text: 'hello!' }]
            
            sandbox.stub(
                todoRepository.schedule,
                functionName,
            ).returns(expectedReturn)

            const result = todoRepository.list()

            expect(result).to.be.deep.equal(expectedReturn)
            expect(todoRepository.schedule[functionName].calledOnce).to.be.ok
        })
    })
})