import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Divider, CircularProgress, TextField, Button } from "@mui/material";
import { ToastError } from "./AlertPops/AlertPop";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllTasksAction,
  GetSingleTasksAction,
  UpdateTaskAction,
} from "../ReduxImplement/Action/todo.action";
import { UPDATE_TASK_RESET } from "../ReduxImplement/Constant/todo.constant";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

const UpdateTask = (props) => {
  const { open, setopen } = props;

  const dispatch = useDispatch();
  const { loading, task, id } = useSelector((state) => state.SingleTask);
  const { isUpdated } = useSelector((state) => state.TaskOperations);

  const handleClose = () => setopen(false);

  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");

  const submitTaskForm = (e) => {
    e.preventDefault();
    if (title === "" || description === "") {
      ToastError("Enter the Fields");
      return;
    } else {
      const Data = {
        title,
        description,
        isCompleted: false,
      };
      dispatch(UpdateTaskAction(Data, id));
      dispatch(GetAllTasksAction());
      handleClose();
    }
  };

  useEffect(() => {
    if (id !== null) {
      if (task && task._id !== id) {
        dispatch(GetSingleTasksAction(id));
      } else {
        settitle(task.title);
        setdescription(task.description);
      }
    }
  }, [dispatch, task, id]);

  useEffect(() => {
    if (isUpdated) {
      dispatch({ type: UPDATE_TASK_RESET });
      dispatch(GetAllTasksAction());
    }
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {loading ? (
          <div className="middle">
            <CircularProgress color="success" />
          </div>
        ) : (
          task && (
            <Box sx={style}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                style={{ textAlign: "center" }}
              >
                Update The Task
              </Typography>
              <Divider />
              <Box style={{ mt: 2 }}>
                <form onSubmit={submitTaskForm}>
                  <div className="inputLabelClass">
                    <Typography variant="h6">Title</Typography>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      placeholder="Enter the task title"
                      fullWidth
                      value={title}
                      onChange={(e) => settitle(e.target.value)}
                    />
                  </div>

                  <div className="inputLabelClass">
                    <Typography variant="h6">Description</Typography>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      size="large"
                      placeholder="Enter task description"
                      fullWidth
                      value={description}
                      onChange={(e) => setdescription(e.target.value)}
                    />
                  </div>
                  <br />
                  <Box className="bgButtonBlue">
                    <Button
                      variant="contained"
                      fullWidth
                      className="bgButtonBlue"
                      type="submit"
                    >
                      Update Task
                    </Button>
                  </Box>
                </form>
              </Box>
            </Box>
          )
        )}
      </Modal>
    </div>
  );
};

export default UpdateTask;
