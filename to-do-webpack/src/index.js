import "./styles.css";
import { createNavBar, createModal, createContentCont, createSideBar } from "./ui_view";

const container = document.querySelector(".container");
const nav = createNavBar();

container.appendChild(nav);
const subCont = document.createElement("div");
subCont.classList.add("sub-cont");
subCont.appendChild(createSideBar());
subCont.appendChild(createContentCont());
subCont.appendChild(createModal());
container.appendChild(subCont);

