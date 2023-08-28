const todoModel = require("../SchemaModels/todo.schema");
const createError = require("http-errors");

//?------------------------------------------
// TODO : Add todo controller
//?------------------------------------------
module.exports.AddTodoController = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const newTask = new todoModel({ user: req.user._id, title, description });
    await newTask.save();
    res.status(201).json({
      success: true,
      task: newTask,
    });
  } catch (error) {
    console.log(error.message);

    next(createError.InternalServerError(error.message));
  }
};

//?------------------------------------------
// TODO : Get  the single task of a user Controller
//?------------------------------------------
module.exports.GetSingleTodoTask = async (req, res, next) => {
  try {
    const Task = await todoModel.findById(req.params.todoId);
    res.status(200).json({
      success: true,
      Task,
    });
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

//?------------------------------------------
// TODO : Get all the task of a user Controller
//?------------------------------------------
module.exports.GetAllTodoTask = async (req, res, next) => {
  try {
    const userTasks = await todoModel.find({ user: req.user._id });
    res.status(200).json({
      success: true,
      userTasks,
      noOfTasks: userTasks.length,
    });
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

//?------------------------------------------
// TODO : update user Todo Task
//?------------------------------------------
module.exports.UpdateTodoTask = async (req, res, next) => {
  try {
    const taskId = req.params.todoId;
    const { title, description, isCompleted } = req.body;
    let data = {};
    if (title) {
      data.title = title;
    }
    if (description) {
      data.description = description;
    }
    if (isCompleted === true) {
      data.isCompleted = isCompleted;
    }
    // await todoModel.findByIdAndUpdate(taskId, data);
    // if (isCompleted === false) {
    await todoModel.findByIdAndUpdate(taskId, {
      $set: data,
    });
    // }
    res.status(200).json({
      success: true,
      message: "Successfully Updated the task",
    });
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

//?------------------------------------------
// TODO : Delete user Todo Task
//?------------------------------------------
module.exports.DeleteTodoTask = async (req, res, next) => {
  try {
    const taskId = req.params.todoId;

    await todoModel.findByIdAndRemove(taskId);
    res.status(200).json({
      success: true,
      message: "Successfully Deleted the task",
    });
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};
