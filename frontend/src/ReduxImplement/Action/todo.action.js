import URLConstant from "../Constant/URL.constant";
import axios from "axios";
import {
  ADD_TASK_FAIL,
  ADD_TASK_REQUEST,
  ADD_TASK_SUCCESS,
  DELETE_TASK_FAIL,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  GET_ALL_TASK_FAIL,
  GET_ALL_TASK_REQUEST,
  GET_ALL_TASK_SUCCESS,
  GET_SINGLE_TASK_FAIL,
  GET_SINGLE_TASK_REQUEST,
  GET_SINGLE_TASK_SUCCESS,
  TASK_CLEAR_ERRORS,
  UPDATE_TASK_FAIL,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
} from "../Constant/todo.constant";

//?------------------------------------------
// TODO : get single  task of a user Action
//?------------------------------------------
export const GetSingleTasksAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_TASK_REQUEST });
    const { data } = await axios.get(`${URLConstant}/todo/${id}`);

    dispatch({
      type: GET_SINGLE_TASK_SUCCESS,
      payload: data.Task,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_TASK_FAIL,
      payload: error.response.data.message,
    });
  }
};

//?------------------------------------------
// TODO : get all the task of a user Action
//?------------------------------------------
export const GetAllTasksAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_TASK_REQUEST });
    const { data } = await axios.get(`${URLConstant}/todo`);

    dispatch({
      type: GET_ALL_TASK_SUCCESS,
      payload: data.userTasks,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_TASK_FAIL,
      payload: error.response.data.message,
    });
  }
};

//?------------------------------------------
// TODO :  Add the task Action
//?------------------------------------------
export const AddTaskAction = (Data) => async (dispatch) => {
  try {
    dispatch({ type: ADD_TASK_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.post(`${URLConstant}/todo/add`, Data, config);

    dispatch({
      type: ADD_TASK_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ADD_TASK_FAIL,
      payload: error.response.data.message,
    });
  }
};

//?------------------------------------------
// TODO :  update the task Action
//?------------------------------------------
export const UpdateTaskAction = (Data, id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_TASK_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.put(`${URLConstant}/todo/${id}`, Data, config);

    dispatch({
      type: UPDATE_TASK_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_TASK_FAIL,
      payload: error.response.data.message,
    });
  }
};

//?------------------------------------------
// TODO :  delete the task Action
//?------------------------------------------
export const DeleteTaskAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_TASK_REQUEST });

    await axios.delete(`${URLConstant}/todo/${id}`);

    dispatch({
      type: DELETE_TASK_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DELETE_TASK_FAIL,
      payload: error.response.data.message,
    });
  }
};

//?------------------------------------------
// TODO : For clear all  the task errors
//?------------------------------------------
export const tasklearErrorsAction = () => async (dispatch) => {
  dispatch({ type: TASK_CLEAR_ERRORS });
};
