const slider = document.querySelector("input");
const board = document.querySelector("#board");
let isMouseDown = false;

// Keeping track of the mouse state so multiple blocks can be selected while holding a mouse button
window.addEventListener("mousedown", (e) => {
    isMouseDown = true
});
window.addEventListener("mouseup", (e) => {
    isMouseDown = false;
});

// window.addEventListener("mouse")

slider.addEventListener("input", (e) => {
    const currentValue = parseInt(e.target.value);
    const numberOfBlocks = board.children.length;

    // If slier value is more than the number of blocks increase the amount of blocks
    if (currentValue > numberOfBlocks) {
        for (let i = 0; i < currentValue - numberOfBlocks; i++) {
            // Creating a block with event listeners
            const block = document.createElement("div");
            block.classList.add("block");
            board.append(block);

            // Hoovering on blocks while clicked
            block.addEventListener("mouseenter", (e) => {
                if (isMouseDown) {
                    block.classList.add("selected");
                };
            });

            // Clicking on a block
            block.addEventListener("mousedown", (e) => {
                block.classList.add("selected");
            });
        };
    }

    // If slider value is less than the number of blocks decrease the amount of blocks
    else {
        for (let i = 0; i < numberOfBlocks - currentValue; i++) {
            board.removeChild(board.lastChild);
        }
    }
});