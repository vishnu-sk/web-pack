import {
  createElementwithClass,
  appendMultipleChildren,
} from "./elementFactory.js";

import img1 from "./images/r1.jpg";
import img2 from "./images/r2.jpg";
import img3 from "./images/r3.jpg";
import img4 from "./images/r4.jpg";
import img5 from "./images/r5.jpg";
import img6 from "./images/r6.jpg";
import img7 from "./images/r7.jpg";
import img8 from "./images/r8.jpg";
import img9 from "./images/r9.jpg";

const cardFactory = (imgUrl, alt, menuItem, price, description) => {
  const card = createElementwithClass("div", "", ["menu-item-cont"]);
  const img = createElementwithClass("img");
  img.src = imgUrl;
  img.alt = alt;
  const cardContent = createElementwithClass("div", "", ["card-content"]);
  const menuItemElem = createElementwithClass("h2", menuItem);
  const priceElem = createElementwithClass("p", price);
  const descriptionElem = createElementwithClass("p", description);
  appendMultipleChildren(cardContent, [
    menuItemElem,
    priceElem,
    descriptionElem,
  ]);
  appendMultipleChildren(card, [img, cardContent]);

  return card;
};

const createMenuPage = () => {
  const imgList = [img1, img2, img3, img4, img5, img6, img7, img8, img9];
  const priceList = [255, 299, 205, 588, 99, 189, 378, 452, 125];
  const descriptionList = [
    "Lorem, ipsum dolor ipsa eos, ullam inventore",
    "sit amet consectetur adipisicing impedit delectus",
    "elit. Pariatur tempore modi velit aliquam maiores! Suscipit.",
    "aliquid ad nostrum, eligendi saepe eum odio, perferendis",
    "Lorem, ipsum dolor ipsa eos, ullam inventore",
    "sit amet consectetur adipisicing impedit delectus",
    "elit. Pariatur tempore modi velit aliquam maiores! Suscipit.",
    "aliquid ad nostrum, eligendi saepe eum odio, perferendis",
    "elit. Pariatur tempore modi velit aliquam maiores! Suscipit.",
  ];
  const imgListLen = imgList.length;
  const menuCont = createElementwithClass("div", "", ["menu-cont"]);

  for (let i = 0; i < imgListLen; i++) {
    const alt = `r${i}`;
    const menuItem = `Item ${i}`;
    const price = `$${priceList[i]}`;
    const card = cardFactory(
      imgList[i],
      alt,
      menuItem,
      price,
      descriptionList[i]
    );
    menuCont.appendChild(card);
  }
  return menuCont;
};

export default createMenuPage;
