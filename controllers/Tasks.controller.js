const model = require("../models").Tasks;
const controller = require("./controller");

class TasksController extends controller {
  constructor(model, name, key) {
    super(model, name, key);
  }
}

module.exports = new TasksController(model, "tasks", {
  create: {
    fail: "get_tasks_failed",
  },
  delete: {
    success: "get_tasks_success",
    fail: "get_tasks_Faild",
  },
});
