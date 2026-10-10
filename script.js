// ===== CRUD Todo App =====
// C = Create -> new task creation
// R = Read   -> show all tasks
// U = Update -> task edit 
// D = Delete -> task delete
 
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
 
// use browser local storage

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
 
// ---------- helper: localStorage update  ----------
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
 
// ---------- READ----------
function renderTasks() {
  taskList.innerHTML = '';
 
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    if (task.completed) li.classList.add('completed');
 
    li.innerHTML = `
      <span onclick="toggleComplete(${index})">${task.text}</span>
      <div class="actions">
        <button onclick="editTask(${index})" title="Edit">✏️</button>
        <button onclick="deleteTask(${index})" title="Delete">🗑️</button>
      </div>
    `;
 
    taskList.appendChild(li);
  });
}
 
// ---------- CREATE ----------
taskForm.addEventListener('submit', function (e) {
  e.preventDefault();
 
  const text = taskInput.value.trim();
  if (text === '') return;
 
  tasks.push({ text: text, completed: false });
  saveTasks();
  renderTasks();
 
  taskInput.value = '';
});
 
// ---------- UPDATE (complete/incomplete toggle) ----------
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}
 
// ---------- UPDATE (text edit) ----------
function editTask(index) {
  const newText = prompt('Task edit:', tasks[index].text);
  if (newText !== null && newText.trim() !== '') {
    tasks[index].text = newText.trim();
    saveTasks();
    renderTasks();
  }
}
 
// ---------- DELETE ----------
function deleteTask(index) {
  const confirmDelete = confirm('Task delete ?');
  if (confirmDelete) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
}
 

renderTasks();
 