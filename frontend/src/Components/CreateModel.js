import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Divider, CircularProgress, TextField, Button } from "@mui/material";
import { ToastError, ToastSuccess } from "./AlertPops/AlertPop";
import { useDispatch, useSelector } from "react-redux";
import {
  AddTaskAction,
  GetAllTasksAction,
  tasklearErrorsAction,
} from "../ReduxImplement/Action/todo.action";
import { ADD_TASK_RESET } from "../ReduxImplement/Constant/todo.constant";

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

const CreateModel = (props) => {
  const { open, setopen } = props;
  const dispatch = useDispatch();
  const { loading, error, isAdded } = useSelector(
    (state) => state.TaskOperations
  );

  const handleClose = () => setopen(false);

  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");

  const submitTaskForm = (e) => {
    e.preventDefault();
    if (title === "" || description === "") {
      ToastError("Enter the Fields");
      return;
    } else {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      dispatch(AddTaskAction(formData));
      handleClose();
    }
  };

  useEffect(() => {
    if (error) {
      ToastError(error);
      dispatch(tasklearErrorsAction());
    }
    if (isAdded) {
      ToastSuccess("successfully Added the task");
      dispatch({ type: ADD_TASK_RESET });
      dispatch(GetAllTasksAction());
    }
  }, [dispatch, error, isAdded]);
  return (
    <div className="createModel">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ textAlign: "center" }}
          >
            Enter your Task
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
                  onChange={(e) => setdescription(e.target.value)}
                />
              </div>
              <br />
              <Box className="bgButtonBlue">
                {loading ? (
                  <div className="middle">
                    <CircularProgress color="success" />
                  </div>
                ) : (
                  <Button
                    variant="contained"
                    fullWidth
                    className="bgButtonBlue"
                    type="submit"
                  >
                    Create Task
                  </Button>
                )}
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateModel;
