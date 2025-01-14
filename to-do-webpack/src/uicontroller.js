import { Todo, Project } from "./ui_model";
import {
  createNavBar,
  createModal,
  createContentCont,
  createSideBar,
} from "./ui_view";
import {
  createElementWithClasses,
  appendMultipleChildren,
} from "./ui_utilities";

let sideBarBtns;
let collapsingIcon;
let headerText;
let form;
let modal;
let todoTask;

function init(collectionList) {
  const container = document.querySelector(".container");

  const nav = createNavBar();
  container.appendChild(nav);
  const subCont = document.createElement("div");
  subCont.classList.add("sub-cont");
  subCont.appendChild(createSideBar());
  subCont.appendChild(createContentCont());
  subCont.appendChild(createModal());
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

function clickSidebarBtn(e) {
  console.log(e.currentTarget);
  //e.preventDefault();
  const dataAttribute = e.currentTarget.getAttribute("data-btn");

  console.log(dataAttribute);
  switch (dataAttribute) {
    case "new":
      newTask();
      console.log("MM");
      break;
    case "search": //create search
      break;
    case "inbox": //switch to inbox
      break;
    case "today": //switch to today tasks
      break;
    case "upcoming": //switch to upcoming tasks
      break;
    default:
      break;
  }
}

function newTask() {
  modal.style.display = "flex";
  form.addEventListener("submit", createTask);
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
}

export default init;
