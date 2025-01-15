import { ProjectCollection } from "./project_collection";
import "./styles.css";
import init from "./uicontroller";

const container = document.querySelector(".container");
const projectCollection = new ProjectCollection();
console.log(projectCollection.getCollection());
(function () {
  init(projectCollection);
})(projectCollection);
