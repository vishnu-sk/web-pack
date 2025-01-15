import { Todo, Project } from "./ui_model";

import {
  createNavBar,
  createModal,
  createContentCont,
  createSideBar,
  taskGenerator,
} from "./ui_view";
import {
  createElementWithClasses,
  appendMultipleChildren,
} from "./ui_utilities";

let container;
let sideBarBtns;
let collapsingIcon;
let headerText;
let form;
let modal;
let todoTask;
let projectCollect;
let currentProjectNow;

function init(collectionList) {
  container = document.querySelector(".container");
  projectCollect = collectionList;
  currentProjectNow = "inbox";
  render();
}

function render() {
  const nav = createNavBar();
  container.appendChild(nav);
  const subCont = document.createElement("div");
  subCont.classList.add("sub-cont");
  subCont.appendChild(createSideBar());
  subCont.appendChild(renderTask(currentProjectNow));
  subCont.appendChild(createModal(projectCollect.getCollection()));
  container.appendChild(subCont);

  const homeProject = new Project("inbox");
  sideBarBtns = document.querySelectorAll(".sidebar-buttons");
  collapsingIcon = document.querySelector(".collapsing");
  headerText = document.querySelector(".header-cont h1");
  form = document.querySelector(".modal-cont form");
  modal = document.querySelector(".modal-cont");

  sideBarBtns.forEach(sideBarBtn =>
    sideBarBtn.addEventListener("click", clickSidebarBtn)
  );
}

function renderTask(project) {
  const content =
    document.querySelector(".content-cont") ??
    createElementWithClasses("div", "", ["content-cont"]);
  content.innerText = "";
  const projectItem = projectCollect
    .getCollection()
    .find(p => p.name === project);
  content.appendChild(taskView(1, projectItem));
  console.log("Rendered content container");
  return content;
}

function taskView(idstart, project) {
  const taskCont = createElementWithClasses("div", "", ["task-cont"]);
  const headerCont = createElementWithClasses("div", "", ["header-cont"]);
  const projectName =
    project.todoList.length > 0 ? project.todoList[0].currentProject : "inbox";
  headerCont.appendChild(
    createElementWithClasses("h1", projectName.toUpperCase())
  );
  taskCont.appendChild(headerCont);
  project.todoList.forEach(todo => {
    idstart += 1;
    const task = taskGenerator(idstart, todo.task, todo.description);
    taskCont.appendChild(task);
  });
  return taskCont;
}

function clickSidebarBtn(e) {
  console.log(e.currentTarget);
  const dataAttribute = e.currentTarget.getAttribute("data-btn");

  console.log(dataAttribute);
  switch (dataAttribute) {
    case "new":
      newTask(projectCollect);
      console.log("MM");
      break;
    case "search": //create search
      break;
    case "inbox": //switch to inbox
      renderTask("inbox");
      break;
    case "today": //switch to today tasks
      break;
    case "upcoming": //switch to upcoming tasks
      break;
    default:
      break;
  }
}

function newTask(projectCollect) {
  modal.style.display = "flex";
  form.addEventListener("submit", e => createTask(e, projectCollect));
  document.addEventListener("click", hideModal);
}

function hideModal(e) {
  if (e.target.className === "modal-cont") {
    modal.style.display = "none";
    document.removeEventListener("click", hideModal);
  }
}

function createTask(e) {
  e.preventDefault();
  const keys = ["name", "desc", "deadline", "prio"];
  const vals = [];
  keys.forEach(key => vals.push(e.target[key].value));
  modal.style.display = modal.style.display == "flex" ? "none" : "flex";
  todoTask = new Todo(vals[0], vals[1], vals[2], vals[3]);
  projectCollect.addTaskToProject(todoTask, todoTask.currentProject);
  console.log(projectCollect);
  const projectCollectList = projectCollect.getCollection();
  renderTask(todoTask.currentProject);
}

export default init;
