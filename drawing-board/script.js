const slider = document.querySelector("input");
const board = document.querySelector("#board");
const sideBar = document.querySelector("#side-bar");
const colorPicker = document.querySelector("input[type='color']");
const clearButton = document.querySelector("#board button");
const modeButtonContainer = document.querySelector("#button-container");
let isMouseDown = false;
let color = colorPicker.value;

// Keeping track of the mouse state so multiple blocks can be selected while holding a mouse button
window.addEventListener("mousedown", (e) => {
    isMouseDown = true
});
window.addEventListener("mouseup", (e) => {
    isMouseDown = false;
});

colorPicker.addEventListener("change", (e) => {
    color = e.target.value;
    console.log(color)
});

// Clear button sets the slider value to 0 which removes all the blocks
clearButton.addEventListener("click", () => {
    slider.value = 0;
    slider.dispatchEvent(new Event('input'));
    slider.dispatchEvent(new Event('input'));
});

Array.from(modeButtonContainer.children).forEach(element => {
    element.addEventListener("click", () => {
        element.classList.add("selected-button");
    });
});

// window.addEventListener("mouse")

const toggleButtons = (remove) => {
    sideBar.style.display = remove ? "none" : "block"
};

slider.addEventListener("input", (e) => {
    const currentValue = parseInt(e.target.value * 10);
    // -1 Because the button shouldn't be counted
    const numberOfBlocks = board.children.length - 1;
    toggleButtons(false);

    // If slier value is more than the number of blocks increase the amount of blocks
    if (currentValue > numberOfBlocks) {
        for (let i = 0; i < currentValue - numberOfBlocks; i++) {
            // Creating a block with event listeners
            const block = document.createElement("div");
            block.classList.add("block");
            board.append(block);

            // Hovering on blocks while clicked
            block.addEventListener("mouseenter", (e) => {
                if (isMouseDown) {
                    block.classList.add("selected");
                    block.style.backgroundColor = color
                };
            });

            // Clicking on a block
            block.addEventListener("mousedown", (e) => {
                block.classList.toggle("selected");
                block.style.backgroundColor = color;
            });
        };
    }

    // If slider value is less than the number of blocks decrease the amount of blocks
    else {
        for (let i = 0; i < numberOfBlocks - currentValue; i++) {
            board.removeChild(board.lastChild);
        };
    };

    if (currentValue === 0) {
        toggleButtons(true);
    };

    // board.style.gridTemplateColumns = `repeat(${currentValue}, 1fr)`;
    // board.style.gridTemplateRows = `repeat(${currentValue}, 1fr)`;
});