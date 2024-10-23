import React, { useState, useEffect } from 'react';
import { firestore } from './firebaseConfig';
import { collection, doc, addDoc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import Task from './Task';
import './styles/TaskManager.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TaskManager = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'To Do' });

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'users', user.uid, 'tasks'), (snapshot) => {
      const taskList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(taskList);
    });

    return () => unsubscribe();
  }, [user.uid]);

  const addTask = async () => {
    if (!newTask.title.trim()) {
      alert('Task title is required');
      return;
    }

    await addDoc(collection(firestore, 'users', user.uid, 'tasks'), { ...newTask });
    setNewTask({ title: '', description: '', status: 'To Do' });
  };

  const deleteTask = async (taskId) => {
    await deleteDoc(doc(firestore, 'users', user.uid, 'tasks', taskId));
  };

  const updateTask = async (taskId, updatedData) => {
    await updateDoc(doc(firestore, 'users', user.uid, 'tasks', taskId), updatedData);
  };

  const onEditTask = (taskId, updatedData) => {
    updateTask(taskId, updatedData);
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    await updateDoc(doc(firestore, 'users', user.uid, 'tasks', taskId), { status: newStatus });
  };

  const onDragEnd = async (result) => {
    const { source, destination } = result;

    if (!destination) return; // If dropped outside, do nothing

    // Get the moved task
    const movedTask = tasks.find(task => task.id === source.draggableId);
    
    // Update task status
    await updateTaskStatus(movedTask.id, destination.droppableId);

    // Rearranging tasks in the state
    const updatedTasks = Array.from(tasks);
    updatedTasks.splice(source.index, 1); // Remove the task from the original position
    updatedTasks.splice(destination.index, 0, { ...movedTask, status: destination.droppableId }); // Add it to the new position

    setTasks(updatedTasks); // Update state
  };

  return (
    <div className="task-manager-container">
      <h2>Task Manager</h2>
      <input
        type="text"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        placeholder="Task Title"
      />
      <textarea
        value={newTask.description}
        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        placeholder="Task Description"
      />
      <button onClick={addTask}>Add Task</button>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="task-columns">
          {['To Do', 'In Progress', 'Completed'].map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  className="task-column"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h3>{status}</h3>
                  {tasks.filter((task) => task.status === status).map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Task
                            task={task}
                            onDelete={deleteTask}
                            onEditTask={onEditTask} // Pass the onEditTask function
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskManager;
