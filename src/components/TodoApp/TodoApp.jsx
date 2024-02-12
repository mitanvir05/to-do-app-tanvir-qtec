import { useEffect, useState } from "react";
import TaskForm from "../TodoApp/TaskForm"
import TaskList from "../TodoApp/TaskList";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filterPriority, setFilterPriority] = useState('all');
  // Local storage Work
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks && storedTasks.length > 0) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateTaskCounters();
    filterTasks();

  }, [tasks, filterPriority]);
  // Add Task
  const addTask = (title, priority) => {
    const newTask = {
      id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
      title,
      priority,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };
  //toggleTaskStatus
  const toggleTaskStatus = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    }));
  };
  //Counter
  const updateTaskCounters = () => {
    setTotalTasks(tasks.length);
    const completedTasksCount = tasks.filter(task => task.completed).length;
    setCompletedTasks(completedTasksCount);
  };
  // Filter
  const filterTasks = () => {
    if (filterPriority === 'all') {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter(task => task.priority === filterPriority));
    }
  };

  const handlePriorityFilterChange = (e) => {
    setFilterPriority(e.target.value);
  };
  //   Edit
  const editTask = (taskId, newTitle, newPriority) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, title: newTitle, priority: newPriority };
      }
      return task;
    }));
  };
  // Delete
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };
  return (
    
    <div className='p-6 card w-full bg-base-300 shadow-xl mt-5 my-5' >
      
      <TaskForm onSubmit={addTask} />
      <div className='text-center mt-5'>
        <label>Filter by Priority: </label>
        <select value={filterPriority} onChange={handlePriorityFilterChange} className="select select-bordered join-item">
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <div className="flex items-center justify-center mt-5 space-x-4"> 
        <div><span className='font-bold'>Total Tasks:</span> {totalTasks}</div>
        <div><span className='font-bold'>Completed Tasks:</span> {completedTasks}</div>
      </div>
       
      </div>
      <TaskList
        tasks={filteredTasks}
        toggleTaskStatus={toggleTaskStatus}
        deleteTask={deleteTask}
        editTask={editTask}
      />

    </div>
  );
};

export default TodoApp;