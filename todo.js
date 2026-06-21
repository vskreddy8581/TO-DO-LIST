let tasks = []
let nextId = 1
let currentFilter = 'all'

// Adds a new task to the tasks array
function addTask() {
  const input = document.getElementById('taskInput')
  const text = input.value.trim()
  if (!text) return

  tasks.push({
    id: nextId++,
    text: text,
    done: false
  })

  input.value = ''
  SaveChanges()
}

// Toggles task completion status (done/undone)
function toggleTask(id) {
  const task = tasks.find(t => t.id === id)
  if (task) task.done = !task.done
  SaveChanges()
}

// Changes the current filter (all, active, done)
function setFilter(filter) {
  currentFilter = filter
  SaveChanges()
}

// Deletes a task using its id
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id)
  SaveChanges()
}

// Removes all tasks and resets the task counter
function clearAll() {
  tasks = []
  nextId = 1
  SaveChanges()
}

// SaveChangess the task list based on the selected filter
function SaveChanges() {
  const list = document.getElementById('list')

  const visible = tasks.filter(t => {
    if (currentFilter === "active") return !t.done
    if (currentFilter === "done") return t.done
    return true
  })

  list.innerHTML = ''

  visible.forEach(task => {
    const li = document.createElement('li')
    li.className = 'task-item' + (task.done ? ' done' : '')

    li.innerHTML = `
      <input class="cbtn" type="checkbox"
      ${task.done ? "checked" : ""}
      onchange="toggleTask(${task.id})">

      <span class="task-text">${task.text}</span>

      <button class="btn3" onclick="deleteTask(${task.id})">✕</button>
    `

    list.appendChild(li)
  })

  document.getElementById('count').innerText =
    'Total No.of Tasks: ' + tasks.length
}

// Adds task when Enter key is pressed
document.getElementById('taskInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') addTask()
})

// Initial SaveChanges when the page loads
SaveChanges()