var tasks = [];

function addTask() {
  var input = document.getElementById("taskInput");
  var task = input.value;
  if (task === "") {
    alert("Please enter a task!");
    return;
  }
  
  tasks.push({ text: task, category: "", completed: false });
  renderTasks();

  input.value = "";
}

function updateTask(index) {
  var newTaskText = prompt("Enter the updated task:", tasks[index].text);
  if (newTaskText === null) {
    return;
  }

  tasks[index].text = newTaskText;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function markTaskAsComplete(index) {
  tasks[index].completed = true;
  renderTasks();
}

function markTaskAsPending(index) {
  tasks[index].completed = false;
  renderTasks();
}

function renderTasks() {
  var allTasksList = document.getElementById("allTasks");
  var completedTasksList = document.getElementById("completedTasks");
  var pendingTasksList = document.getElementById("pendingTasks");

  allTasksList.innerHTML = "";
  completedTasksList.innerHTML = "";
  pendingTasksList.innerHTML = "";

  for (var i = 0; i < tasks.length; i++) {
    var listItem = document.createElement("li");
    listItem.innerHTML = tasks[i].text;

    if (tasks[i].completed) {
      listItem.classList.add("completed");
    }

    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.onclick = function(index) {
      return function() {
        deleteTask(index);
      };
    }(i);

    var updateButton = document.createElement("button");
    updateButton.innerHTML = "Update";
    updateButton.classList.add("update-button");
    updateButton.onclick = function(index) {
      return function() {
        updateTask(index);
      };
    }(i);

    var actionsDiv = document.createElement("div");
    actionsDiv.classList.add("actions");

    var completeButton = document.createElement("button");
    completeButton.innerHTML = "Complete";
    completeButton.classList.add("complete-button");
    completeButton.onclick = function(index) {
      return function() {
        markTaskAsComplete(index);
      };
    }(i);

    var pendingButton = document.createElement("button");
    pendingButton.innerHTML = "Pending";
    pendingButton.classList.add("pending-button");
    pendingButton.onclick = function(index) {
      return function() {
        markTaskAsPending(index);
      };
    }(i);

    actionsDiv.appendChild(deleteButton);
    actionsDiv.appendChild(updateButton);

    if (tasks[i].completed) {
      listItem.appendChild(pendingButton);
    } else {
      listItem.appendChild(completeButton);
    }

    listItem.appendChild(actionsDiv);

    allTasksList.appendChild(listItem);

    if (tasks[i].completed) {
      completedTasksList.appendChild(listItem.cloneNode(true));
    } else {
      pendingTasksList.appendChild(listItem.cloneNode(true));
    }
  }
}

renderTasks();
