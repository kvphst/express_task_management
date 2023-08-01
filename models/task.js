const Task = function(title, description, due_date, status) {
        this.title = title;
        this.description = description;
        this.due_date = due_date;
        this.status = status;
    };
    
module.exports = Task;