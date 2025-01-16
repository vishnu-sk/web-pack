import {
  compareAsc,
  formatDistanceToNowStrict,
  formatDistanceStrict,
} from "date-fns";

class Todo {
  constructor(task, description, deadline, priority, currentProject = "inbox") {
    this.task = task;
    this.deadline =
      deadline.length > 10
        ? new Date(deadline.slice(0, 10) + "T00:00:00.000Z")
        : new Date(deadline + "T00:00:00.000Z");
    this.priority = priority;
    this.description = description;
    this.checked = false;
    this.currentProject = currentProject;
    this.updateCurrentDateGroup();
  }

  trueCheckStatus() {
    this.checked = true;
  }
  falseCheckStatus() {
    this.checked = false;
  }

  changePriority(newPrio) {
    this.priority = newPrio;
  }

  updateCurrentDateGroup() {
    const date = new Date();
    const today = new Date(
      `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1)
        .toString()
        .padStart(2, "0")}-${(date.getUTCDate() + 1)
        .toString()
        .padStart(2, "0")}T00:00:00.000Z`
    );
    // console.log(
    //   `comp - ${compareAsc(this.deadline, today)} : ${today} : ${this.deadline}`
    //);
    if (compareAsc(this.deadline, today) == 0) {
      this.currentDateGroup = "today";
    } else if (compareAsc(this.deadline, today) == 1) {
      const dist = formatDistanceStrict(today, this.deadline, { unit: "day" });
      //console.log(`distance: ${dist}`);
      if (dist == "2 days") {
        this.currentDateGroup = "upcoming";
      } else {
        this.currentDateGroup = "future";
      }
    } else {
      this.currentDateGroup = "expired";
    }
  }
}

class Project {
  constructor(name, list = []) {
    this.name = name;
    this.todoList = list;
    this.isActive = false;
  }

  addTaskToProject(todo) {
    this.todoList.push(todo);
  }

  removeTaskFromProject(todo) {
    const index = this.todoList.findIndex(i => i.task === todo.task);
    this.todoList.splice(index, 1);
  }

  makeProjectActive() {
    this.isActive = true;
  }

  deactivateProject() {
    this.isActive = false;
  }
}

export { Todo, Project };
