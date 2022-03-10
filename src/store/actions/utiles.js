// this file contains the common used functions

import * as localData from "../../data/localData";
export const getPriority = (id) => {
  return localData.priorities.find((priority) => priority.id === id).title;
};

export const getEmployee = (id) => {
  return localData.employees.find((employee) => employee.id === id).title;
};

export const getStatue = (id) => {
  return localData.status.find((statue) => statue.id === id).title;
};
