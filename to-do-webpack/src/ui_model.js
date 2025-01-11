import { compareAsc, formatDistanceToNowStrict } from "date-fns";

export class Todo {
  constructor(task, description, deadline, priority) {
    this.task = task;
    this.deadline = new Date(deadline + "T00:00:00");
    this.priority = priority;
    this.description = description;
    this.checked = false;
    this.currentProject = "inbox";
    this.updateCurrentDateGroup();
  }

  changeCheckStatus() {
    this.checked = !this.checked;
  }

  changePriority(newPrio) {
    this.priority = newPrio;
  }

  updateCurrentDateGroup() {
    const date = new Date();
    const today = new Date(
      `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`
    );
    if (compareAsc(today, this.deadline) == 0) {
      this.currentDateGroup = "today";
    } else if (compareAsc(today, this.deadline) == 1) {
      const dist = formatDistanceToNowStrict(this.deadline, {
        unit: "day",
      });
      if (dist == 2) {
        this.currentDateGroup = "upcoming";
      }
    } else {
      this.currentDateGroup = "expired";
    }
  }
}

class Project{
    constructor(){
        this.todoList = [];
    }

    addTaskToProject(todo){
        this.todoList.push(todo);
    }

    removeTaskFromProject(todo){
        const index = this.todoList.indexOf(todo);
        this.todoList.splice(index, 1);
    }
}
