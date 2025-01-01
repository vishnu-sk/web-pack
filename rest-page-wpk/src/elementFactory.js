const createElementwithClass = (
    elementType,
    text = "",
    classlist = [],
    idName = null
  ) => {
    const element = document.createElement(elementType);
    if (classlist.length !== 0) {
      classlist.forEach(class1 => {
        element.classList.add(class1);
      });
    }
    if (idName) {
      element.id = idName;
    }
    if (text !== "") {
      element.innerText = text;
    }
    return element;
  };
  
  const appendMultipleChildren = (element, childrenToAppend) => {
    childrenToAppend.forEach(child => element.appendChild(child));
  };

  export {createElementwithClass, appendMultipleChildren};