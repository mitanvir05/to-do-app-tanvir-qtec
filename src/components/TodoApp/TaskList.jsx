import TaskItem from './TaskItem';

const TaskList = ({ tasks, toggleTaskStatus, deleteTask, editTask} ) => {
  return (
    <div className='text-center my-5 '>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          toggleTaskStatus={toggleTaskStatus}
          deleteTask={deleteTask}
          editTask={editTask}
        />

      ))}
    </div>
  );
};

export default TaskList;