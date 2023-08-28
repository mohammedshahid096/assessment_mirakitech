import {
  ADD_TASK_FAIL,
  ADD_TASK_REQUEST,
  ADD_TASK_RESET,
  ADD_TASK_SUCCESS,
  DELETE_TASK_FAIL,
  DELETE_TASK_REQUEST,
  DELETE_TASK_RESET,
  DELETE_TASK_SUCCESS,
  GET_ALL_TASK_FAIL,
  GET_ALL_TASK_REQUEST,
  GET_ALL_TASK_SUCCESS,
  GET_SINGLE_TASK_FAIL,
  GET_SINGLE_TASK_REQUEST,
  GET_SINGLE_TASK_SUCCESS,
  TASK_CLEAR_ERRORS,
  TASK_ID,
  UPDATE_TASK_FAIL,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_RESET,
  UPDATE_TASK_SUCCESS,
} from "../Constant/todo.constant";

//?------------------------------------------
// TODO : get all the task Reducer
//?------------------------------------------
export const GetAllTaskReducer = (state = { tasks: [] }, action) => {
  switch (action.type) {
    case GET_ALL_TASK_REQUEST:
      return {
        loading: true,
      };
    case GET_ALL_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: action.payload,
      };
    case GET_ALL_TASK_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case TASK_CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

//?------------------------------------------
// TODO : task operations Reducer
//?------------------------------------------
export const TaskOperationsReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TASK_REQUEST:
    case UPDATE_TASK_REQUEST:
    case DELETE_TASK_REQUEST:
      return {
        loading: true,
      };
    case ADD_TASK_SUCCESS:
      return {
        loading: false,
        isAdded: true,
      };
    case UPDATE_TASK_SUCCESS:
      return {
        loading: false,
        isUpdated: true,
      };
    case DELETE_TASK_SUCCESS:
      return {
        loading: false,
        isDeleted: true,
      };
    case ADD_TASK_FAIL:
    case UPDATE_TASK_FAIL:
    case DELETE_TASK_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADD_TASK_RESET:
      return {
        ...state,
        isAdded: null,
      };
    case UPDATE_TASK_RESET:
      return {
        ...state,
        isUpdated: null,
      };
    case DELETE_TASK_RESET:
      return {
        ...state,
        isDeleted: null,
      };
    case TASK_CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

//?------------------------------------------
// TODO : single todo task Reducer
//?------------------------------------------
export const SingleTaskReducer = (state = { task: {}, id: null }, action) => {
  switch (action.type) {
    case GET_SINGLE_TASK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_SINGLE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        task: action.payload,
      };
    case GET_SINGLE_TASK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case TASK_ID:
      return {
        ...state,
        id: action.payload,
      };
    default:
      return state;
  }
};
