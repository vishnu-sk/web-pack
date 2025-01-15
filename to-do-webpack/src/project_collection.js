import { Project } from "./ui_model";
export { ProjectCollection };

class ProjectCollection {
  constructor(collectionList = []) {
    this.collection = collectionList.length == 0 ? this.initCollection() : collectionList;
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
        const newProject = new Project(list.name, list.todoList);
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
  }

  getCollection() {
    return this.collection;
  }

  addTaskToProject(task, projectName) {
    const index = this.collection.findIndex(projectItem => projectItem.name == projectName);
    if (index == -1) {
      return;
    }
    this.collection[index].addTaskToProject(task);
    this.store();
  }

  removeTaskFromProject(task, projectName) {
    const index = this.collection.findIndex(projectItem => projectItem.name == projectName);
    if (index == -1) {
      return;
    }
    this.collection.splice(index, 1);
    this.store();
  }
}
