const buttonDiv = document.getElementById("buttonDiv");
const current = "current";
const presetButtonColors = [
  "#3aa757",
  "#e8453c",
  "#f9bb2d",
  "#4688f1",
  "#FFFFFF",
];

function handleButtonClick(event) {
  const currentButton = event.target.parentElement.querySelector(`.${current}`);

  if (currentButton === event.target) {
    return;
  }

  currentButton.classList.remove(current);
  event.target.classList.add(current);

  const color = event.target.dataset.color;
  chrome.storage.sync.set({ color });
}

function constructOptions() {
  chrome.storage.sync.get("color", (data) => {
    const selectedColor = data.color;
    for (let buttonColor of presetButtonColors) {
      const newButton = document.createElement("button");
      newButton.dataset.color = buttonColor;
      newButton.style.backgroundColor = buttonColor;
      newButton.classList.add("selection");

      if (buttonColor === selectedColor) {
        newButton.classList.add(current);
        console.log(`selected ${newButton.classList}`);
      }

      newButton.addEventListener("click", handleButtonClick);
      buttonDiv.appendChild(newButton);
    }
  });
}

constructOptions();
