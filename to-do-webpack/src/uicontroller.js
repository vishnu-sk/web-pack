import { Todo, Project } from "./ui_model";

import {
  createNavBar,
  createModal,
  createContentCont,
  createSideBar,
  taskGenerator,
  createModalForProject,
  ChangeTaskItemColor,
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
  container.innerText = "";
  const nav = createNavBar();
  container.appendChild(nav);
  const subCont = document.createElement("div");
  subCont.classList.add("sub-cont");
  subCont.appendChild(createSideBar(projectCollect));
  subCont.appendChild(renderTask(currentProjectNow));
  //subCont.appendChild(createModal(projectCollect.getCollection()));
  container.appendChild(subCont);
  updateEventListeners();
}

function updateEventListeners() {
  sideBarBtns = document.querySelectorAll(".sidebar-buttons");
  collapsingIcon = document.querySelector(".collapsing");
  headerText = document.querySelector(".header-cont h1");
  form = document.querySelector(".modal-cont form");
  modal = document.querySelector(".modal-cont");
  const taskCont = document.querySelectorAll(".task-item");
  taskCont.forEach(task => {
    task.addEventListener("click", e => {
      console.log(e.target);
      const taskNumberOnUI = e.target.parentNode.firstChild.id;
      const el =
        projectCollect.findProjectInCollection(currentProjectNow).todoList[
          taskNumberOnUI - 1
        ];

      if (e.target.type == "checkbox") {
        handleCheckBox(e, el);
        //here e is the event for click on task cont
      } else if (e.target.id == "task-prio") {
        e.target.addEventListener("change", e =>
          handlePrioDropdown(e, el, task)
        );
        //here e is event for change of value of dropdown
      }
      //console.log(el);
      projectCollect.store();
    });
  });

  sideBarBtns.forEach(sideBarBtn =>
    sideBarBtn.addEventListener("click", clickSidebarBtn)
  );

  console.log("rendered page");
}

function renderTask(project) {
  const content =
    document.querySelector(".content-cont") ??
    createElementWithClasses("div", "", ["content-cont"]);
  content.innerText = "";
  const projectItem = projectCollect
    .getCollection()
    .find(p => p.name.toLowerCase() === project);
  content.appendChild(taskView(0, projectItem));
  updateEventListeners();
  console.log("Rendered content container");
  return content;
}

function taskView(idstart, project) {
  const taskCont = createElementWithClasses("div", "", ["task-cont"]);
  const headerCont = createElementWithClasses("div", "", ["header-cont"]);
  const projectName = project.todoList.length > 0 ? project.name : "inbox";
  headerCont.appendChild(
    createElementWithClasses("h1", project.name.toUpperCase())
  );
  taskCont.appendChild(headerCont);
  project.todoList.forEach(todo => {
    idstart += 1;
    const task = taskGenerator(
      idstart,
      todo.task,
      todo.description,
      todo.checked,
      todo.priority
    );
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
      newTaskProject();
      console.log("MM");
      break;
    case "search": //create search
      break;
    case "inbox": //switch to inbox
      renderTask("inbox");
      currentProjectNow = "inbox";
      break;
    case "today": //switch to today tasks
      break;
    case "upcoming": //switch to upcoming tasks
      break;
    case "project":
      newTaskProject(false);
      break;
    default:
      renderTask(dataAttribute);
      currentProjectNow = dataAttribute;
      break;
  }
}

function newTaskProject(isTask = true) {
  let callback;
  if (isTask) {
    container.appendChild(createModal(projectCollect.getCollection()));
    callback = createTask;
  } else {
    container.appendChild(createModalForProject());
    console.log(container);
    callback = createProject;
  }
  updateEventListeners();
  modal.style.display = "flex";
  form.addEventListener("submit", callback);
  document.addEventListener("click", hideModal);
}

function hideModal(e) {
  if (e.target.className === "modal-cont") {
    removeModal(e.target);
  }
}

function removeModal(target) {
  modal.style.display = "none";
  document.removeEventListener("click", hideModal);
  target.parentNode.removeChild(target);
}

function createProject(e) {
  e.preventDefault();
  const name = e.target.name.value;
  const newProject = new Project(name);
  projectCollect.addProjectToCollection(name);
  console.log(projectCollect.getCollection());
  currentProjectNow = name;
  removeModal(modal);
  render();
}

function createTask(e) {
  e.preventDefault();
  const keys = ["name", "desc", "deadline", "prio", "proj"];
  const vals = [];
  keys.forEach(key => vals.push(e.target[key].value));
  todoTask = new Todo(vals[0], vals[1], vals[2], vals[3], vals[4]);
  projectCollect.addTaskToProjectCollection(todoTask, todoTask.currentProject);
  console.log(projectCollect);
  const projectCollectList = projectCollect.getCollection();
  removeModal(modal);
  renderTask(todoTask.currentProject);
}

function handleCheckBox(e, el) {
  if (e.target.checked) {
    el.trueCheckStatus();
  } else {
    el.falseCheckStatus();
  }
}

function handlePrioDropdown(e, el, taskCont) {
  el.changePriority(e.target.value);
  e.target.removeEventListener("change", e => handlePrioDropdown(e, el));
  //console.log(taskCont.parentNode);
  ChangeTaskItemColor(taskCont.parentNode, e.target.value);
  console.log("---------");
}

export default init;
