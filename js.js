document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('date').min = new Date().toISOString().split('T')[0];
});

function addTask() {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const date = document.getElementById('date').value;

  if (title && date) {
    const taskList = document.getElementById('taskList');
    const tasks = getTasks();

    const taskItem = {
      title,
      description,
      date,
    };

    tasks.push(taskItem);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    renderTasks();
  }
}

function showTasks(day) {
  const tasks = getTasks();
  const filteredTasks = tasks.filter(task => {
    const taskDate = new Date(task.date);
    const dayOfWeek = taskDate.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
    return dayOfWeek === day;
  });

  renderTasks(filteredTasks);
}

function renderTasks(tasks) {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  if (tasks) {
    tasks.forEach(taskItem => {
      const taskElement = document.createElement('div');
      taskElement.className = 'task-item';
      taskElement.innerHTML = `
        <div style="display:flex; flex-direction: column;">
          <span>${taskItem.title}</span>
          <span">${taskItem.description}</span>
          <span">${taskItem.date}</span>
        </div>
        <button onclick="deleteTask(this)">Delete</button>
      `;
      taskList.appendChild(taskElement);
    });
  }
}

function getTasks() {
  const tasksString = localStorage.getItem('tasks');
  return tasksString ? JSON.parse(tasksString) : [];
}

function deleteTask(button) {
  const taskItem = button.parentNode;
  const tasks = getTasks();
  const taskIndex = Array.from(taskItem.parentNode.children).indexOf(taskItem);
  tasks.splice(taskIndex, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  renderTasks();
}
