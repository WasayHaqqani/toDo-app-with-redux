export const ADD_TASKS = 'ADD_TASKS';
export const ADD_TASK_ID = 'ADD_TASK_ID';
export const REMOVE_TASK = 'REMOVE_TASK';
export const MARK_AS_COMPLETED = 'MARK_AS_COMPLETED';
// export const TRIGGER_IS_COMPLETED = 'TRIGGER_IS_COMPLETED';

export const setTasks = tasks => dispatch => {
  dispatch({type: ADD_TASKS, payload: tasks});
};

export const setTaskId = taskId => dispatch => {
  dispatch({type: ADD_TASK_ID, payload: taskId});
};

export const setDeleteTask = taskId => dispatch => {
  dispatch({type: REMOVE_TASK, payload: taskId});
};

export const setMarkAsDone = taskId => dispatch => {
  dispatch({type: MARK_AS_COMPLETED, payload: taskId});
};

// export const setTriggerIsCompleted = taskId => dispatch => {
//   dispatch({type: TRIGGER_IS_COMPLETED, payload: taskId});
// };
