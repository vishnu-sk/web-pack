import "./styles.css";
import intro from "./homePage.js";
import menu from "./menuPage.js";

//console.log(intro);

const k = document.querySelector("#content");
const homeElems = intro.createHome();
k.appendChild(homeElems.introCont);
k.appendChild(homeElems.timingsIntroCont);

const button = document.querySelector("nav");

button.addEventListener("click", e => {
    console.log(e.target.id);
  if (e.target.id == "menu") {
    k.innerHTML = "";
    const menuElems = menu();
    k.appendChild(menuElems);
  } else if (e.target.id == "home") {
    k.innerHTML = "";
    k.appendChild(homeElems.introCont);
    k.appendChild(homeElems.timingsIntroCont);
  }
});

//k.appendChild(homeElems.introCont);
//k.appendChild(homeElems.timingsIntroCont);
