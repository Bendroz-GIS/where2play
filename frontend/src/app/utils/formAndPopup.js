
 // animation de retrait + suppression
function closeElement(targetClassName) {
  return new Promise((resolve) => {
    const elementToRemove = document.getElementsByClassName(targetClassName)[0];
    if (!elementToRemove) {
      resolve();
    }

    elementToRemove.classList.remove("show");

    setTimeout(() => {
      elementToRemove.remove();
      resolve();
    }, 500);
  })
}

function getInputValue() {
  const obj = {}

  const inputNumber = document.getElementsByClassName("input-form");
  for (const e of inputNumber) {
    obj[e.id] = e.classList.contains("number") ? parseInt(e.value) : e.value
  };
  return obj;
}


export { closeElement, getInputValue }