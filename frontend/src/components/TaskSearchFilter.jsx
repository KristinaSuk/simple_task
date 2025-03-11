// src/components/TaskSearchFilter.jsx
import { useState } from 'react'

function TaskSearchFilter({ onFilterChange }) {
  const [search, setSearch] = useState('')
  const [priority, setPriority] = useState('')
  const [status, setStatus] = useState('')
  const [category, setCategory] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onFilterChange({ search, priority, status, category })
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <label>Title: </label>
      <input 
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search by title..."
        style={{ marginRight: '10px' }}
      />
      
      <label>Priority: </label>
      <select
        value={priority}
        onChange={e => setPriority(e.target.value)}
        style={{ marginRight: '10px' }}
      >
        <option value="">All</option>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <label>Status: </label>
      <select
        value={status}
        onChange={e => setStatus(e.target.value)}
        style={{ marginRight: '10px' }}
      >
        <option value="">All</option>
        <option>New</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>

      <label>Category: </label>
      <input 
        type="text"
        value={category}
        onChange={e => setCategory(e.target.value)}
        placeholder="e.g. 'Work'"
        style={{ marginRight: '10px' }}
      />

      <button type="submit">Filter</button>
    </form>
  )
}

export default TaskSearchFilter