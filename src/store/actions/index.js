// this file contains redux actions

// this package if for creating random id for each task
import { v4 as uuidv4 } from "uuid";


import { ADD_TASK, DELETE_TASK, EDIT_TASK, RESET_FORM_VALUES } from "./types";

// this action fires when adding new task
export const addTask = (task) => {
  return (dispatch, getState) => {
    const tasks = getState().tasks;

    dispatch({
      type: ADD_TASK,
      payload: [...tasks, { ...task, id: uuidv4() }],
    });
// this action fires to close creating task form
    dispatch({
      type: "openPopup",
      payload: false,
    });

    // this action fires to notify user that the task is created  
    dispatch({
      type: "notify",
      payload: {
        isOpen: true,
        message: "Submitted Successfully",
        type: "success",
      },
    });
  };
};

// this action fires when deleting task
export const deleteTask = (id) => {
  return (dispatch, getState) => {
    const modifiedTasks = getState().tasks.filter((task) => task.id !== id);
    dispatch({
      type: DELETE_TASK,
      payload: modifiedTasks,
    });
     // this action fires to notify user that the task is deleted
    dispatch({
      type: "notify",
      payload: {
        isOpen: true,
        message: "Deleted Successfully",
        type: "error",
      },
    });
  };
};

// this action fires when editing task
export const editTask = (updatedTask) => {
  return (dispatch, getState) => {
    const editedTasks = getState().tasks.map((task) => {
      return updatedTask.id === task.id ? updatedTask : task;
    });

    dispatch({
      type: EDIT_TASK,
      payload: editedTasks,
    });

    // this action fires to open editing task form
    dispatch({
      type: "openPopup",
      payload: false,
    });

    // this action fires to notify user that the task is edited 
    dispatch({
      type: "notify",
      payload: {
        isOpen: true,
        message: "Submitted Successfully",
        type: "success",
      },
    });

    // this action fires to reset the form
    dispatch({
      type: RESET_FORM_VALUES,
    });
  };
};
