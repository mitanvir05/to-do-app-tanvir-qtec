import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskItem = ({ task, toggleTaskStatus, deleteTask, editTask }) => {
  const notify = () => toast("Task Deleted Successfully");
  const [title, setTitle] = useState(task.title);
  const [editing, setEditing] = useState(false);
  const [priority, setPriority] = useState(task.priority);


  const handleToggleStatus = () => {
    toggleTaskStatus(task.id);
  };
  const handleDelete = () => {
    deleteTask(task.id);
  };
  const handleEdit = () => {
    setEditing(true);
  };

  const handleSaveEdit = () => {
    editTask(task.id, title, priority);
    setEditing(false);
  };

  const handleCancelEdit = () => {
    setTitle(task.title);
    setPriority(task.priority);
    setEditing(false);
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };
  const priorityColors = {
    low: 'green',
    medium: 'blue',
    high: 'red'
  };

  const priorityStyles = {
    borderRadius: '50%',
    width: '15px',
    height: '15px',
    backgroundColor: priorityColors[task.priority],
    display: 'inline-block',
    marginRight: '8px',
    border: '2px solid #2980b9'
  };

  return (

    <div>
      {
        editing ? (
          <div className="space-x-2 space-y-3 ">

            <input type="text" value={title} onChange={handleChange} placeholder="Enter Task Title" className="select select-bordered join-item" />

            <select value={priority} onChange={handlePriorityChange} className="select select-bordered join-item">
              <option disabled selected>Select one</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button onClick={handleSaveEdit} className='btn btn-success btn-sm'>Save</button>
            <button onClick={handleCancelEdit} className='btn btn-warning btn-sm'>Cancel</button>
          </div>
        ) : (

          <div className="space-x-6 space-y-3 ">
            <span style={priorityStyles}></span>
            <span>{task.priority} </span>
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title} </span>
            <button onClick={handleToggleStatus} className="btn btn-success btn-xs">
              {task.completed ? 'Incomplete' : 'Complete'}
            </button>
            <button onClick={handleEdit} className="btn btn-info btn-xs">Edit</button>
            <button onClick={() => {
              handleDelete();
              notify();
            }} className="btn btn-error btn-xs">Delete</button>

            <ToastContainer />
          </div>
        )
      }
    </div >


  );
};

export default TaskItem;