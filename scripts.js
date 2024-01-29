function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
      addTaskToTable(task);
    });
  }
  
  function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  function addTaskToTable(task) {
    const table = document.getElementById('taskTable');
    const row = table.insertRow();
    row.insertCell(0).innerText = task.responsible;
    row.insertCell(1).innerText = task.taskName;
    row.insertCell(2).innerText = task.startDate;
    row.insertCell(3).innerText = task.finishDate;
  
    const statusCell = row.insertCell(4);
    statusCell.innerText = task.status;
    row.className = task.status.toLowerCase();
  
    const actionCell = row.insertCell(5);
    const statusSelect = document.createElement('select');
    statusSelect.className = 'status-select';
    statusSelect.innerHTML = `
      <option value="ongoing" ${task.status === 'Ongoing' ? 'selected' : ''}>Ongoing</option>
      <option value="completed" ${task.status === 'Finished' ? 'selected' : ''}>Mark as Completed</option>
      <option value="delayed" ${task.status === 'Delayed' ? 'selected' : ''}>Mark as Delayed</option>
    `;
    statusSelect.addEventListener('change', () => {
      if (statusSelect.value === 'completed') {
        row.className = 'finished';
        statusCell.innerText = 'Finished';
        task.status = 'Finished';
      } else if (statusSelect.value === 'delayed') {
        row.className = 'delayed';
        statusCell.innerText = 'Delayed';
        task.status = 'Delayed';
      } else {
        row.className = 'ongoing';
        statusCell.innerText = 'Ongoing';
        task.status = 'Ongoing';
      }
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });
    actionCell.appendChild(statusSelect);
  
    const commentCell = row.insertCell(6);
    const commentInput = document.createElement('input');
    commentInput.setAttribute('type', 'text');
    commentInput.className = 'comment-input';
    commentInput.value = task.comment;
    commentInput.addEventListener('input', () => {
      task.comment = commentInput.value;
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });
    commentCell.appendChild(commentInput);
  }
  
  document.getElementById('taskForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const responsible = document.getElementById('responsible').value;
    const taskName = document.getElementById('taskName').value;
    const startDate = document.getElementById('startDate').value;
    const finishDate = document.getElementById('finishDate').value;
  
    const task = {
      responsible: responsible,
      taskName: taskName,
      startDate: startDate,
      finishDate: finishDate,
      status: 'Ongoing',
      comment: ''
    };
  
    saveTask(task);
    addTaskToTable(task);
  
    document.getElementById('taskForm').reset();
  });
  
  loadTasks();
  