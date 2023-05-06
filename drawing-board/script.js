const slider = document.querySelector("input");
const board = document.querySelector("#board");
const sideBar = document.querySelector("#side-bar");
const colorPicker = document.querySelector("input[type='color']");
const clearButton = document.querySelector("#board button");
const modeButtonContainer = document.querySelector("#button-container");
const modeButtons = Array.from(modeButtonContainer.children);
let isMouseDown = false;
let color = colorPicker.value;
let mode = "Hover Effect";

// Keeping track of the mouse state so multiple blocks can be selected while holding a mouse button
window.addEventListener("mousedown", (e) => {
    isMouseDown = true;
});

window.addEventListener("mouseup", (e) => {
    isMouseDown = false;
});

colorPicker.addEventListener("change", (e) => {
    color = e.target.value;
});

// Clear button sets the slider value to 0 which removes all the blocks
clearButton.addEventListener("click", () => {
    slider.value = 0;
    slider.dispatchEvent(new Event("input"));
});


// Setting the mode when the mouse is on the board
board.addEventListener("mouseenter", () => {
    if (mode === "Hover Effect") {
        setHoverMode();
    }
    else {
        setDrawingMode();
    };
});

// A function used when the mode is changed to remove the added event listeners to the blocks so the new ones can work
const refreshBlocks = () => {
    const blocks = Array.from(board.children).slice(1);
    blocks.forEach((element) => {
        element.removeEventListener("mouseenter", hoverMouseEnter);
        element.removeEventListener("mouseout", hoverMouseOut);
        element.removeEventListener("mouseenter", drawingMouseEnter);
        element.removeEventListener("mousedown", drawingMouseDown);
    });
};

// Block events for the hover mode

// Add a random color to the block when the mouse is on it
const hoverMouseEnter = (e) => {
    setRandomColor();
    e.target.style.backgroundColor = color;
    e.target.classList.add("selected");
};

// Remove the color when the mouse moves out of the block
const hoverMouseOut = (e) => {
    setTimeout(() => {
        e.target.style.backgroundColor = "transparent";
        e.target.classList.remove("selected");
    }, 300);
};

// BLock events for the drawing mode

// Hovering on blocks while clicked
const drawingMouseEnter = (e) => {
    color = colorPicker.value;
    if (isMouseDown) {
        e.target.classList.add("selected");
        e.target.style.backgroundColor = color;
    };
};

// Clicking on a block
const drawingMouseDown = (e) => {
    // Remove the color if the block is selected
    if (e.target.classList.contains("selected")) {
        e.target.style.backgroundColor = "transparent";
    }
    // Set the color if clicked on a not selected block
    else {
        e.target.style.backgroundColor = color;
    };

    e.target.classList.toggle("selected");
};

const setHoverMode = () => {
    currentChildren = Array.from(board.children).slice(1);
    refreshBlocks();

    currentChildren.forEach((block) => {
        block.addEventListener("mouseenter", hoverMouseEnter);
        block.addEventListener("mouseout", hoverMouseOut);
    });
};

const setDrawingMode = () => {
    currentChildren = Array.from(board.children).slice(1);
    refreshBlocks();

    currentChildren.forEach((block) => {
        block.addEventListener("mouseenter", drawingMouseEnter);
        block.addEventListener("mousedown", drawingMouseDown);
    });
};


// Making the mode buttons change change the mode when clicked
modeButtons.forEach(element => {
    const isHover = element.textContent === "Hover Effect" ? true : false;
    if (isHover) {
        element.dispatchEvent(new Event("click"));
    };

    element.addEventListener("click", () => {
        modeButtons.forEach((element) => { element.classList.remove("selected-button"); });
        element.classList.add("selected-button");
        mode = element.textContent;
    });
});


// Changing the visibility of the the buttons around the board based on the boolean provided
const toggleButtons = (remove) => {
    sideBar.style.display = remove ? "none" : "block";
    modeButtons.forEach(element => {
        element.style.display = remove ? "none" : "inline-block";
    });
};

const colors = ["#056CF2", "#05AFF2", "#F2E205", "#F28705", "#A62103", '#FF5733', '#C70039', '#900C3F', '#581845', '#00BFFF', '#0074D9', '#FFDC00', '#FF851B', '#7FDBFF', '#3D9970'];
const setRandomColor = () => {
    color = colors[Math.floor(Math.random() * colors.length)];
};

slider.addEventListener("input", (e) => {
    const currentValue = parseInt(e.target.value * 10);
    // -1 Because the side bar shouldn't be counted
    const numberOfBlocks = board.children.length - 1;
    toggleButtons(false);

    // If slider value is more than the number of blocks increase the amount of blocks
    if (currentValue * 2 > numberOfBlocks) {
        for (let i = 0; i < (currentValue * 2) - numberOfBlocks; i++) {
            const block = document.createElement("div");
            block.classList.add("block");
            board.append(block);
        };
    }

    // If slider value is less than the number of blocks decrease the amount of blocks
    else {
        for (let i = 0; i < numberOfBlocks - (currentValue * 2); i++) {
            board.lastChild.remove();
        };
    };

    // Hide the buttons if there is nothing to show
    if (currentValue === 0) {
        toggleButtons(true);
    };

    // Update the grid
    board.style.gridTemplateColumns = `repeat(${currentValue / 10}, 1fr)`;
});