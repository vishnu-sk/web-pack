import {
  createElementwithClass,
  appendMultipleChildren,
} from "./elementFactory.js";

function createContact(address, email, contact) {
  const contactCard = createElementwithClass("div", "", ["contact-cont"]);
  const cardElems = { Address: address, Email: email, Contact: contact };

  for (let key in cardElems) {
    const hStrong = createElementwithClass("strong", key + " : ");
    const pElement = document.createElement("p");
    const pTextContent = document.createTextNode(cardElems[key]);
    appendMultipleChildren(pElement, [hStrong, pTextContent]);
    contactCard.appendChild(pElement);
  }
  return contactCard;
}

function createAbout() {
  const aboutCont = createElementwithClass("div", "", ["about-container"]);
  const h2Elem = createElementwithClass("h2", "Contact");
  aboutCont.appendChild(h2Elem);
  const addresses = [
    "House no1, Lane no 2, Street 5, Township, Country, 234567",
    "House no1, Lane no 2, Street 5, Township, Country, 234567",
  ];
  const emails = ["123RealMail@not-fake.com", "123RealMail@not-fake.com"];
  const contacts = ["456-789-123", "456-789-123"];
  const contactNums = addresses.length;
  for (let i = 0; i < contactNums; i++) {
    aboutCont.appendChild(createContact(addresses[i], emails[i], contacts[i]));
  }
  return aboutCont;
}

export default createAbout;
