const inputField = document.querySelector("input");
const tasks = document.querySelector("#tasks");
const clearButton = document.querySelector("#add-task-section button");
let currentTask = false

const getElementHTML = (task) => {
    return `<button class="complete-button"><i class="fa-solid fa-check fa-flip" style="color: #000000;"></i></button>
    <p>${task}</p>`;
};

const getNumberOfTasks = () => {
    let counter = 0
    Array.from(tasks.children).forEach(() => {
        counter++
    })

    return counter
}

const updateTasks = () => {
    document.querySelector("header p").innerHTML = `Number Of Tasks: ${getNumberOfTasks()}`;
};
updateTasks();


inputField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const task = inputField.value;
        const element = document.createElement("div");
        element.classList.add("task");
        element.innerHTML = getElementHTML(task);
        tasks.append(element);
        inputField.value = "";

        const deleteBtn = document.querySelectorAll(".complete-button");
        deleteBtn.forEach((button) => {
            button.addEventListener("click", () => {
                button.parentNode.remove();
                updateTasks();
            });
        updateTasks();
        });
    };
});

clearButton.addEventListener("click", () => {
    Array.from(tasks.children).forEach((t) => {
        t.remove();
    });
    updateTasks();
});

// let last_index = 0;
// inputField.addEventListener("input", (e) => {
//     let currentString = inputField.value.slice(last_index);
//     if (currentString.length === 89) {
//         last_index = inputField.value.length;
//         inputField.value = inputField.value + " ";
//     };
// });