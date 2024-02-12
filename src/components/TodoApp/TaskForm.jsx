import { useState } from 'react';

const TaskForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('low');  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit(title, priority);
    setTitle('');
    setPriority('low');  
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className='space-x-2 flex justify-center items-center'>
     <input type="text" value={title} onChange={handleTitleChange} placeholder="Task Title" className="input font-medium input-bordered input-info w-full max-w-xs" />
     <select value={priority} onChange={handlePriorityChange} className="select select-bordered join-item">
        <option disabled selected>Select one</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
    </select>

      <button className='btn btn-primary btn-sm' type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;