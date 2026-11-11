import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [taskInput, setTaskInput] = useState('')
  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('tasks')) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = () => {
    const text = taskInput.trim()
    if (!text) return
    setTasks([...tasks, text])
    setTaskInput('')
  }

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index))
  }

  return (
    <div>
      <input
        placeholder="Add a task"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && addTask()}
      />
      <button onClick={addTask} className="add-btn">
        Add
      </button>

      <table>
        <thead>
          <tr>
            <th>Number</th>
            <th>Task</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{task}</td>
              <td>
                <button onClick={() => deleteTask(index)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
