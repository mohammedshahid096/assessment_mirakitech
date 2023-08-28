import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import GetCookie from "./Middlewares/Cookie";
import { UserReducer } from "./ReduxImplement/Reducer/user.reducer";
import {
  GetAllTaskReducer,
  SingleTaskReducer,
  TaskOperationsReducer,
} from "./ReduxImplement/Reducer/todo.reducer";

//?------------------------------------------
// TODO : all the reducers are imported
//?------------------------------------------
const Reducer = combineReducers({
  User: UserReducer,
  TaskData: GetAllTaskReducer,
  TaskOperations: TaskOperationsReducer,
  SingleTask: SingleTaskReducer,
});

//?------------------------------------------
// TODO : initial state
//?------------------------------------------
const initialState = {
  User: {
    token: GetCookie() ? GetCookie() : null,
  },
};

const middleware = [thunk];

//?------------------------------------------
// TODO : creating a store and exporting
//?------------------------------------------
const StoreDB = createStore(
  Reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default StoreDB;
