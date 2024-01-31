import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskForm from "./TaskForm";
import { getTasks, updateTaskOrder } from "./services/tasks";
import "./TaskStyle.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const response = await getTasks();
    setTasks(response.data);
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const newTasks = [...tasks];
    const [reorderedItem] = newTasks.splice(result.source.index, 1);
    newTasks.splice(result.destination.index, 0, reorderedItem);
    setTasks(newTasks);
    updateTaskOrder(newTasks); //Update the order in the backend
  };
  return (
    <div className="container">
      <h1>Task List</h1>
      <hr />
      <div className="taskForm">
        <TaskForm fetchTasks={fetchTasks} />
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="task">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {tasks.map((task, index) => (
                <Draggable key={task._id} draggableId={task._id} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {index + 1}. {task.title}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TaskList;
