const uuid = require('uuid/v4')

class Todo {
    constructor (title, description) {
        this.title = title;
        this.description = description;
        this.id = uuid();
        this.isCompleted = false;
    }
}

module.exports = Todo;
