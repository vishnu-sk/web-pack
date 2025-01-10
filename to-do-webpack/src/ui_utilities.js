const createElementWithClasses = (
  elementType,
  content = "",
  classlist = [],
  elemId = ""
) => {
  const elem = document.createElement(elementType);
  const text = document.createTextNode(content);
  if (content !== "") {
    elem.appendChild(text);
  }
  if (classlist.length > 0) {
    classlist.forEach(className => elem.classList.add(className));
  }
  if (elemId !== "") {
    elem.id = elemId;
  }
};

const appendMultipleChildren = (elem, children) => {
    [...children].forEach(childElem => elem.appendChild(childElem));
};

export {createElementWithClasses, appendMultipleChildren};
