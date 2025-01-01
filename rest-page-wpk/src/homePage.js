import introImage from "./images/rest-img.jpg";
import {
  createElementwithClass,
  appendMultipleChildren,
} from "./elementFactory.js";

//Function to create Home UI
function createHome() {
  // Creating Container for intro
  const introCont = createElementwithClass("div", "", ["intro-cont"]);
  
  //h1
  const h1Cont = createElementwithClass(
    "h1",
    "Welcome to Castle Rock - Where Flavor Meets Elegance"
  );

  //img-cont
  const imgCont = createElementwithClass("div", "", ["img-cont"]);
  const imgElement = document.createElement("img");
  imgElement.src = introImage;
  imgElement.alt = "restaurant image";
  imgCont.appendChild(imgElement);

  //para-cont
  const textForP1 =
    " Step into a world of unforgettable dining experiences at Castle Rock. Located in the heart of New Town, our restaurant offers aperfect blend of culinary artistry, impeccable service, and a warm,inviting atmosphere. Whether you're here for an intimate dinner, a family gathering, or a celebration, we pride ourselves on crafting dishes that delight the senses and bring people together.";
  const textForP2 =
    "At Castle Rock, we use only the finest, locally sourced ingredients to create a menu bursting with flavor. From mouthwatering appetizers to indulgent desserts, every bite is a testament to our commitment to quality and creativity. Our chefs are dedicated to delivering both innovative and timeless flavors, ensuring each meal is a memorable journey for your taste buds. Join us for an exceptional dining experience where every detail is designed to make you feel special. Your table is ready.";
  const p1 = createElementwithClass("p", textForP1);
  const p2 = createElementwithClass("p", textForP2);
  const br1 = createElementwithClass("br");
  const paraCont = createElementwithClass("div", "", ["para-cont"]);
  appendMultipleChildren(paraCont, [p1, br1, p2]);
  const clearFloatdiv = createElementwithClass("div", "", ["clear-float"]);

  //cont for timings
  const timingsIntroCont = createElementwithClass("div", "", ["intro-cont"]);
  const timingsCont = createElementwithClass("div", "", ["timings-cont"]);
  const h2Elem = createElementwithClass("h2", "Timings");
  const timingsList = createElementwithClass("ul", "", ["timings"]);
  const li1 = createElementwithClass("li", "Mon - Thu: 9am to 9pm");
  const li2 = createElementwithClass("li", "Friday: 9am to 12pm");
  const li3 = createElementwithClass("li", "Sat & Sun : 12pm to 12pm");
  appendMultipleChildren(timingsList, [li1, li2, li3]);
  appendMultipleChildren(timingsCont, [h2Elem, timingsList]);

  appendMultipleChildren(introCont, [h1Cont, imgCont, paraCont, clearFloatdiv]);
  timingsIntroCont.appendChild(timingsCont);
  return { introCont, timingsIntroCont };
}

export default { createHome };
