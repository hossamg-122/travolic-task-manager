import { ADD_TASK, DELETE_TASK, EDIT_TASK } from "../actions/types";

const tasksReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TASK:
      return action.payload;
    case DELETE_TASK:
      return action.payload;
    case EDIT_TASK:
      return action.payload;
    default:
      return state;
  }
};

export default tasksReducer;
