const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const inProgressList = document.getElementById("in-progress-list");
const completedList = document.getElementById("completed-list");

// Load saved tasks
const saved = JSON.parse(localStorage.getItem("todos")) || [];
saved.forEach(addTask);

// Add new task
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = input.value.trim();
  if (!task) return;
  addTask({ text: task, completed: false });
  input.value = "";
  saveTasks();
});

function addTask(task) {
  const li = document.createElement("li");
  li.textContent = task.text;

  // Assign to the right list
  const parentList = task.completed ? completedList : inProgressList;
  parentList.appendChild(li);

  // Toggle complete on click
  li.addEventListener("click", () => {
    task.completed = !task.completed;
    parentList.removeChild(li);
    addTask(task);
    saveTasks();
  });

  // Right-click to delete
  li.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    parentList.removeChild(li);
    saveTasks();
  });
}

function saveTasks() {
  const tasks = [];
  [...inProgressList.children].forEach(li => tasks.push({ text: li.textContent, completed: false }));
  [...completedList.children].forEach(li => tasks.push({ text: li.textContent, completed: true }));
  localStorage.setItem("todos", JSON.stringify(tasks));
}
