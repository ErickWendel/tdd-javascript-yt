const { createSandbox, stub } = require('sinon')
const { describe, it, before, beforeEach, afterEach } = require('mocha')
const { expect } = require('chai')

const TodoService = require('../src/todoService')
const Todo = require('../src/todo')


describe('todoService', () => {
    let sandbox

    before(() => sandbox = createSandbox())
    afterEach(() => sandbox.restore())

    describe('#list', () => {
        const mockDatabase = [
            {
                id: '0001',
                text: 'Hello World',
                when: new Date('2021-01-01'),
                status: 'pending',

                meta: { revision: 0, created: 10000, version: 0 },
                $loki: 3
            },
        ]

        beforeEach(() => {
            const dependencies = {
                todoRepository: {
                    list: sandbox.stub().returns(mockDatabase),
                }
            }

            todoService = new TodoService(dependencies)
        })

        it('should return data on a specific format', () => {
            const result = todoService.list()
            const [{ meta, $loki, ...expected }] = mockDatabase

            expect(result).to.be.deep.equal([expected])
        })
    })

    describe('#create', () => {
        beforeEach(() => {
            const dependencies = {
                todoRepository: {
                    create: sandbox.stub().returns(true),
                }
            }
            todoService = new TodoService(dependencies)
        })

        it('shouldn\'t save todo item with invalid data', () => {
            const data = new Todo({ text: '', when: '' })
            Reflect.deleteProperty(data, "id")

            const result = todoService.create(data)
            const expected = {
                error: {
                    message: 'invalid data!',
                    data: data
                }
            }

            expect(result).to.be.deep.equal(expected)
        })

        it('should save todo item with late status when the property is further than today', () => {
            const properties = {
                text: 'I must walk my dog',
                when: new Date('2020-12-01 12:00:00 GMT-0')
            }

            const data = new Todo(properties)
            Reflect.set(data, "id", "00001")

            const today = new Date("2020-12-29")
            sandbox.useFakeTimers(today.getTime())

            todoService.create(data)

            const expectedCallWith = {
                ...properties,
                id: data.id,
                status: "late"
            }
            expect(todoService.todoRepository.create.calledOnceWithExactly(expectedCallWith)).to.be.ok

        })

        it('should save todo item with pending status', () => {
            const properties = { text: 'I must buy new clothes', when: new Date('2020-12-30 17:00:00 GMT-0') }
            const data = new Todo(properties)
            Reflect.set(data, "id", "00001")

            const today = new Date("2020-12-29")
            sandbox.useFakeTimers(today.getTime())

            todoService.create(data)

            const expectedCallWith = {
                ...properties,
                id: data.id,
                status: "pending"
            }
            expect(todoService.todoRepository.create.calledOnceWithExactly(expectedCallWith)).to.be.ok
        })
    })

})