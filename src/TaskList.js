import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, onEditTask, onDeleteTask }) => {
  return (
    <div>
      {tasks.map((task, index) => (
        <Task
          key={task.id}
          task={task}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
          index={index}
        />
      ))}
    </div>
  );
};

export default TaskList;
