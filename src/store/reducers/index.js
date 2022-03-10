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
const configStorage = {
  key: "root",
  storage,
  whitelist: ["tasks"],
};
export default persistReducer(configStorage, rootReducer);
