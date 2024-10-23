import React, { useState } from 'react';

const Task = ({ task, onDelete, onEditTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ title: task.title, description: task.description });

  const handleEdit = () => {
    if (isEditing) {
      onEditTask(task.id, editedTask); // Call the edit function passed from TaskManager
    }
    setIsEditing(!isEditing); // Toggle edit mode
  };

  return (
    <div className="task-item">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
          />
          <textarea
            value={editedTask.description}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
          />
        </div>
      ) : (
        <div>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
        </div>
      )}
      <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
};

export default Task;
