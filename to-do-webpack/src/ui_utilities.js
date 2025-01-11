const createElementWithClasses = (
  elementType,
  content = "",
  classes = [],
  elemId = ""
) => {
  const elem = document.createElement(elementType);
  const text = document.createTextNode(content);
  if (content !== "") {
    elem.appendChild(text);
  }
  if (classes.length > 0) {
    classes.forEach(className => elem.classList.add(className));
  }
  if (elemId !== "") {
    elem.id = elemId;
  }
  return elem;
};

const appendMultipleChildren = (elem, children) => {
    [...children].forEach(childElem => elem.appendChild(childElem));
};

export {createElementWithClasses, appendMultipleChildren};
