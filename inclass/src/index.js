const Todo = require("./todo")
const TodoRepository = require("./todoRepository")
const TodoService = require("./todoService")


;(() => {
    const todoRepository = new TodoRepository()
    const todoService = new TodoService({ todoRepository })

        ;[
            new Todo({
                text: 'I must meet Chaves da Silva',
                when: new Date('2021-01-21')
            }),

            new Todo({
                text: 'I must fix my old car',
                when: new Date('2021-02-21')
            }),

            new Todo({
                text: 'I must plan my trip to Europe',
                when: new Date('2021-03-22')
            })
        ].map(todoService.create.bind(todoService))

    const todoList = todoService.list()

    console.log(
        'todoList', todoList
    )
})()