import "./styles.css";
import intro from "./homePage.js"

console.log(intro);

const k = document.querySelector("#content");
const homeElems = intro.createHome();

//k.appendChild(homeElems.introCont);
//k.appendChild(homeElems.timingsIntroCont);