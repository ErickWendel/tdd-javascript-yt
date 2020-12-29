class TodoService {
    constructor({ todoRepository }) {
        this.todoRepository = todoRepository
    }
    
    create(todoItem) {
        const { when } = todoItem
        const today = new Date()
        const todo = {
            status: when > today ? 'pending' : 'late'
        }
        return this.todoRepository.create(todo)
    }

    list(query) {
        return this.todoRepository.list(query)
    }
}

module.exports = TodoService