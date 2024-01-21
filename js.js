document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('date').min = new Date().toISOString().split('T')[0];
  });
  
  function addTask() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;
  
    if (title && date) {
      const taskList = document.getElementById('taskList');
  
      const taskItem = document.createElement('div');
      taskItem.className = 'task-item';
      taskItem.innerHTML = `
      <div  style="display:flex; flex-direction: column;">
        <span>${title}</span>
        <span">${description}</span>
    </div>
        <button onclick="deleteTask(this)">Delete</button>
      `;
  
      taskList.appendChild(taskItem);
    }
  }
  
  function editTask(button) {
    const taskItem = button.parentNode;
    const title = taskItem.querySelector('span').textContent.split(' - ')[0];
    const date = taskItem.querySelector('span').textContent.split(' - ')[1];
  
    document.getElementById('title').value = title;
    document.getElementById('date').value = date;
  
    taskItem.remove();
  }
  
  function deleteTask(button) {
    const taskItem = button.parentNode;
    taskItem.remove();
  }