import { v4 as uuidv4 } from "uuid";
import { ADD_TASK, DELETE_TASK, EDIT_TASK, RESET_FORM_VALUES } from "./types";

export const addTask = (task) => {
  return (dispatch, getState) => {
    const tasks = getState().tasks;

    dispatch({
      type: ADD_TASK,
      payload: [...tasks, { ...task, id: uuidv4() }],
    });
    dispatch({
      type: "openPopup",
      payload: false,
    });
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
export const deleteTask = (id) => {
  return (dispatch, getState) => {
    const modifiedTasks = getState().tasks.filter((task) => task.id !== id);
    dispatch({
      type: DELETE_TASK,
      payload: modifiedTasks,
    });
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
export const editTask = (updatedTask) => {
  return (dispatch, getState) => {
    const editedTasks = getState().tasks.map((task) => {
      return updatedTask.id === task.id ? updatedTask : task;
    });

    dispatch({
      type: EDIT_TASK,
      payload: editedTasks,
    });
    dispatch({
      type: "openPopup",
      payload: false,
    });
    dispatch({
      type: "notify",
      payload: {
        isOpen: true,
        message: "Submitted Successfully",
        type: "success",
      },
    });
    dispatch({
      type: RESET_FORM_VALUES,
    });
  };
};
