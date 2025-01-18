import { Project, Todo } from "./ui_model";
export { ProjectCollection };

class ProjectCollection {
  constructor(collectionList = []) {
    this.collection =
      collectionList.length == 0 ? this.initCollection() : collectionList;
    this.defaultProject = null;
  }

  initCollection() {
    const lists = [];
    if (!localStorage.getItem("project-collections")) {
      const defaultProject = new Project("inbox");
      lists.push(defaultProject);
      this.defaultProject = "inbox";
    } else {
      const projectItems = JSON.parse(
        localStorage.getItem("project-collections")
      );
      for (let list of projectItems) {
        const newProject = new Project(list.name);
        const todoList = list.todoList;
        for (let todo of todoList) {
          const toDo = new Todo(
            todo.task,
            todo.description,
            todo.deadline,
            todo.priority,
            list.name
          );
          if (todo.checked) {
            toDo.trueCheckStatus();
          }
          newProject.addTaskToProject(toDo);
        }
        lists.push(newProject);
      }
    }
    return lists;
  }

  store() {
    if (this.collection) {
      localStorage.setItem(
        "project-collections",
        JSON.stringify(this.collection)
      );
    }
    console.log("Saved in Local storage!!");
  }

  getCollection() {
    return this.collection;
  }

  findProjectInCollection(projectName) {
    return this.collection.find(project => project.name === projectName);
  }

  addTaskToProjectCollection(task, projectName) {
    const index = this.collection.findIndex(
      projectItem => projectItem.name == projectName
    );
    if (index == -1) {
      return;
    }
    this.collection[index].addTaskToProject(task);
    this.store();
  }

  removeTaskFromProjectCollection(task, projectName) {
    const index = this.collection.findIndex(
      projectItem => projectItem.name == projectName
    );
    if (index == -1) {
      return;
    }
    this.collection[index].removeTaskFromProject(task);
    this.store();
  }

  addProjectToCollection(projectName) {
    this.collection.push(new Project(projectName));
    this.store();
  }

  removeProjectFromCollection(projectName) {
    const index = this.collection.findIndex(
      projectItem => projectItem.name == projectName
    );
    if (index == -1) {
      return;
    }
    this.collection.splice(index, 1);
    this.store();
  }
}
