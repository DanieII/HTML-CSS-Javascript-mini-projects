const inputField = document.querySelector("input");
const tasks = document.querySelector("#tasks");
const getElementHTML = (task) => {
    return `<button class="complete-button"><i class="fa-solid fa-check fa-flip" style="color: #000000;"></i></button>
    <p>${task}</p>`;
};


inputField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const task = inputField.value
        const element = document.createElement("div");
        element.classList.add("task");
        element.innerHTML = getElementHTML(task);
        tasks.append(element);
        inputField.value = "";

        const deleteBtn = document.querySelectorAll(".complete-button")
        deleteBtn.forEach((button) => {
            button.addEventListener("click", () => {
                button.parentNode.remove()
            });
        });
    }
});