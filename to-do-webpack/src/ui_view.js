import {
  createElementWithClasses,
  appendMultipleChildren,
} from "./ui_utilities";

function createNavBar() {
  //creating nav bar element and adding children
  //
  const navElem = createElementWithClasses("nav", "", ["nav-bar"]);
  navElem.appendChild(
    createElementWithClasses("h1", "TO-DO-LIST", ["nav-heading"])
  );
  return navElem;
}

function createSideBar() {
  const iconClass = "material-symbols-outlined";

  //creating elements for side bar container and direct children
  //
  const sideBarCont = createElementWithClasses("div", "", ["side-bar-cont"]);
  const collapsingIcon = createElementWithClasses("span", "home", [
    iconClass,
    "collapsing",
  ]);
  const sideBarHeader = createElementWithClasses("div", "", [
    "side-bar-header",
  ]);

  //appending children to side bar header element
  //
  const iconList = ["add_circle", "search", "inbox", "today", "event_upcoming"];
  const iconDataBtnList = ["New", "Search", "Inbox", "Today", "Upcoming"];
  appendMultipleChildren(
    sideBarHeader,
    sideBarButtonGenerator(iconList, iconDataBtnList)
  );
  const lineBreak = document.createElement("br");
  const horizontalBreak = document.createElement("hr");
  appendMultipleChildren(sideBarHeader, [
    lineBreak,
    horizontalBreak,
    lineBreak,
  ]);
  appendMultipleChildren(
    sideBarHeader,
    sideBarButtonGenerator(["add_circle"], ["Project"])
  );

  //Appeneding elements to side bar container element
  //
  appendMultipleChildren(sideBarCont, [collapsingIcon, sideBarHeader]);

  return sideBarCont;
}

function createContentCont() {
  const content = createElementWithClasses("div", "", ["content-cont"]);
  const headerCont = createElementWithClasses("div", "", ["header-cont"]);
  headerCont.appendChild(createElementWithClasses("h1", "INBOX"));
  const taskCont = createElementWithClasses("div", "", ["task-cont"]);
  const taskItem = taskGenerator("1", "Hello every Nyah","This is task description");
  taskCont.appendChild(taskItem);
  appendMultipleChildren(content, [headerCont, taskCont]);
  return content;
}

/*
      Function to generate side bar buttons as list 
  */
function sideBarButtonGenerator(iconList, iconDataBtnList) {
  const sideBarButtonList = [];
  const buttonLength = iconList.length;
  for (let i = 0; i < buttonLength; i++) {
    const sideBarButton = createElementWithClasses("button", "", [
      "sidebar-buttons",
    ]);
    sideBarButton.setAttribute("data-btn", iconDataBtnList[i].toLowerCase());
    const icon = createElementWithClasses("span", iconList[i], [
      "material-symbols-outlined",
    ]);
    const iconText = createElementWithClasses("span", iconDataBtnList[i], [
      "add-task-btn",
    ]);
    appendMultipleChildren(sideBarButton, [icon, iconText]);
    sideBarButtonList.push(sideBarButton);
  }

  return sideBarButtonList;
}

function dropDownGenerator(name, dropdownId, valueObject) {
  const dropDown = createElementWithClasses("select", "", [], dropdownId);
  dropDown.setAttribute("name", name);
  for (let key in valueObject) {
    console.log(valueObject[key]);
    const dropDownElems = createElementWithClasses("option", valueObject[key]);
    dropDownElems.value = key;
    dropDown.appendChild(dropDownElems);
  }
  return dropDown;
}

function taskGenerator(elemId, task, taskDescription) {
  const taskItemCont = createElementWithClasses("div", "", ["task-item-cont"]);
  const taskItem = createElementWithClasses("div", "", ["task-item"]);
  const checkBox = createElementWithClasses("input", "", [], elemId);
  checkBox.setAttribute("type", "checkbox");
  checkBox.setAttribute("name", elemId);
  const labelForDropdown = createElementWithClasses("label", task);
  labelForDropdown.setAttribute("for", elemId);
  const dropDownVals = { 1: "1", 2: "2", 3: "3", 4: "4" };
  const dropdown = dropDownGenerator("prio", "task-prio", dropDownVals);
  const deleteButton = createElementWithClasses("button", "", [
    "delete-task-btn",
  ]);
  deleteButton.appendChild(
    createElementWithClasses("span", "delete", ["material-symbols-outlined"])
  );
  appendMultipleChildren(taskItem, [
    checkBox,
    labelForDropdown,
    dropdown,
    deleteButton,
  ]);

  const taskDesc = createElementWithClasses("div", "", ["task-desc"]);
  const buttonForDesc = document.createElement("button");
  buttonForDesc.appendChild(
    createElementWithClasses("span", "arrow_drop_down_circle", [
      "material-symbols-outlined",
    ])
  );

  const description = createElementWithClasses("p", taskDescription,['task-description']);
  appendMultipleChildren(taskDesc,[buttonForDesc,description]);

  appendMultipleChildren(taskItemCont,[taskItem, taskDesc]);
  return taskItemCont;
}

function createModal() {
  const modalCont = createElementWithClasses("div", "", ["modal-cont"]);
  const form = createElementWithClasses("form", "", ["add-task-form"]);
  const formLabels = [
    { for: "task-name", task: "Enter task" },
    { for: "task-desc", task: "Task Description" },
    { for: "task-date", task: "Enter deadline" },
  ];

  const formInputs = [
    { type: "text", name: "name", placeholder: "Eg: Buy groceries" },
    { type: "text", name: "desc", placeholder: "Eg: 5 Eggs, 1 bottle milk." },
    { type: "date", name: "deadline", placeholder: "Eg: Buy groceries" },
  ];

  const formFieldLen = formLabels.length;
  for (let i = 0; i < formFieldLen; i++) {
    const formField = createElementWithClasses("div", "", ["form-fields"]);
    const formLabel = createElementWithClasses("label", formLabels[i].task);
    formLabel.setAttribute("for", formLabels[i].for);
    const formInput = createElementWithClasses(
      "input",
      "",
      [],
      formLabels[i].for
    );
    formInput.setAttribute("type", formInputs[i].type);
    formInput.setAttribute("name", formInputs[i].name);
    formInput.setAttribute("placeholder", formInputs[i].placeholder);
    appendMultipleChildren(formField, [formLabel, formInput]);
    form.appendChild(formField);
  }
  const formField = createElementWithClasses("div", "", ["form-fields"]);
  const dropdownLabel = createElementWithClasses("label", "Task Priority: ");
  dropdownLabel.setAttribute("for", "task-prio");
  const dropDownVals = { 1: "1", 2: "2", 3: "3", 4: "4" };
  const dropdown = dropDownGenerator("prio", "task-prio", dropDownVals);
  const submit = document.createElement("input");
  submit.setAttribute("type", "submit");
  submit.value = "+ Add task";
  appendMultipleChildren(formField, [dropdownLabel, dropdown]);
  appendMultipleChildren(form, [formField, submit]);
  modalCont.appendChild(form);
  return modalCont;
}

export { createNavBar, createSideBar, createContentCont, createModal };
