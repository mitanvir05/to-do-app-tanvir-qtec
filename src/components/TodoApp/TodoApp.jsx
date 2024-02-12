import { useEffect, useState } from "react";
import TaskForm from "../TodoApp/TaskForm"
import TaskList from "../TodoApp/TaskList";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
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

  }, [tasks]);
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
  return (
    <div className='space-y-4 mt-10 my-5' >
      <div className="flex items-center justify-center space-x-4">
        <div><span className='font-bold'>Total Tasks:</span> {totalTasks}</div>
        <div><span className='font-bold'>Completed Tasks:</span> {completedTasks}</div>
      </div>
      <TaskForm onSubmit={addTask} />
      <TaskList
        tasks={tasks}
        toggleTaskStatus={toggleTaskStatus}
      />

    </div>
  );
};

export default TodoApp;