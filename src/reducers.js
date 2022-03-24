import {
  ADD_TASKS,
  ADD_TASK_ID,
  REMOVE_TASK,
  MARK_AS_COMPLETED,
} from './actions';

const initialState = {
  tasks: [],
  taskID: 1,
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    case ADD_TASK_ID:
      return {
        ...state,
        taskID: action.payload,
      };
    case REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(item => item.id !== action.payload),
      };
    case MARK_AS_COMPLETED:
      return {
        ...state,
        tasks: state.tasks.map(item =>
          item.id === action.payload ? {...item, isComplete: true} : item,
        ),
      };
    default:
      return state;
  }
};
export default taskReducer;
