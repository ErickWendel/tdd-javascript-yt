const { createSandbox } = require('sinon')
const { describe, it, before, afterEach } = require('mocha')
const { expect } = require('chai')

const TodoService = require('../src/todoService')
const Todo = require('../src/todo')


describe('todoService', () => {
    let sandbox
    before(() => {
        sandbox = createSandbox()    
    })

    afterEach(() => {
        sandbox.reset()
    })

    it('shouldn\'t save todo item with invalid date')    
    it('shouldn\'t save todo item with invalid date')    
    
    it('should save todo item with late status')    
    it('should save todo item with pending status')    



})