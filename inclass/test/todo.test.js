const { describe, it, before, afterEach } = require('mocha')
const { expect } = require('chai')

const Todo = require('../src/todo')
const { createSandbox } = require('sinon')


describe('todo', () => {
    let sandbox
    before(() => sandbox = createSandbox())
    afterEach(() => sandbox.restore())

    describe('#isValid', () => {

        it('should return invalid when creating an object without text', () => {
            const data = {
                text: '',
                when: new Date("2020-12-01")
            }

            const todo = new Todo(data)
            const result = todo.isValid()
            expect(result).to.be.not.ok
        })

        it('should return invalid when creating an object without "when" or "when" is invalid', () => {
            const data = {
                text: 'Hello World',
                when: new Date("20-01-01")
            }

            const todo = new Todo(data)
            const result = todo.isValid()
            expect(result).to.be.not.ok
        })

        it('should have "id", "text", "when" and "status" properties after creating object', () => {
            const data = {
                text: 'call ensurance company',
                when: new Date("2020-12-01")
            }

            const expectedId = '00000001'
            const expected = {
                text: data.text,
                when: data.when,
                status: "",
                id: expectedId
            }

            const uuid = require('uuid')
            const fakeUUID = sandbox.fake.returns(expectedId)
            sandbox.replace(uuid, uuid.v4.name, fakeUUID)
            
            const result = new Todo(data)
            
            expect(uuid.v4.calledOnce).to.be.ok
            expect(result).to.be.deep.equal(expected)
        })
    })
})