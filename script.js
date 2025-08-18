document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task-input");
  const addBtn = document.getElementById("add-btn");
  const taskList = document.getElementById("task-list");

  // Load tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  renderTasks();

  // Add task
  addBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    tasks.push({ text: taskText, completed: false });
    taskInput.value = "";
    saveTasks();
    renderTasks();
  });

  // Handle task click (delete or complete)
  taskList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const index = e.target.dataset.index;
      tasks.splice(index, 1);
    } else if (e.target.tagName === "LI") {
      const index = e.target.dataset.index;
      tasks[index].completed = !tasks[index].completed;
    }
    saveTasks();
    renderTasks();
  });

  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.textContent = task.text;
      li.dataset.index = index;
      if (task.completed) {
        li.classList.add("completed");
      }

      const delBtn = document.createElement("button");
      delBtn.innerHTML = "&times;";
      delBtn.classList.add("delete-btn");
      delBtn.dataset.index = index;

      li.appendChild(delBtn);
      taskList.appendChild(li);
    });
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
