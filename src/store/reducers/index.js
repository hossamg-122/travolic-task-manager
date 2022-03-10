import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import taskManagerReducer from "./taskManagerReducer";
import tasksReducer from "./tasksReducer";
import taskValuesReducer from "./taskValuesReducer";

export const rootReducer = combineReducers({
  taskManager:taskManagerReducer,
  tasks: tasksReducer,
  taskValues: taskValuesReducer,
});

// I used redux - persist package to store the tasks in local storage it's a powerfull package and controls 
// the local storage perfect instead of the ordinary way 
// the reducer in the white list is what I neet to store in local storage
const configStorage = {
  key: "root",
  storage,
  whitelist: ["tasks"],
};
export default persistReducer(configStorage, rootReducer);
