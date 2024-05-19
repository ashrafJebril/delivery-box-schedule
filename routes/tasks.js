const express = require("express");
const router = express.Router();
const tasksCtrl = require("../controllers/Tasks.controller");

router.post("/", async (req, res) => {
  const result = await tasksCtrl.create(req.body);
  res.status(result.status);
  delete result.status;
  res.send(result);
});

router.get("/all", async (req, res) => {
  const result = await tasksCtrl.getAll();
  res.status(result.status);
  delete result.status;
  res.send(result);
});

router.get("/:id", async (req, res) => {
  const result = await tasksCtrl.getById(req.params.id);
  res.status(result.status);
  delete result.status;
  res.send(result);
});

router.put("/:id", async (req, res) => {
  const result = await tasksCtrl.update(req.params.id, req.body);
  res.status(result.status);
  delete result.status;
  res.send(result);
});

router.put("/activate/:id", async (req, res) => {
  const result = await tasksCtrl.activate(req.params.id);
  res.status(result.status);
  delete result.status;
  res.send(result);
});

router.delete("/deactivate/:id", async (req, res) => {
  const result = await tasksCtrl.deactivate(req.params.id);
  res.status(result.status);
  delete result.status;
  res.send(result);
});
module.exports = router;
