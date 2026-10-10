import { Router } from "express";
import { createTask, getTasks } from "./tasks.js";

const router = Router();

router.post("/", (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== "string") {
    return res.status(400).json({
      error: "Title is required and must be a string",
    });
  }

  const task = createTask(title.trim());

  return res.status(201).json(task);
});

router.get("/", (_req, res) => {
  return res.status(200).json(getTasks());
});

export default router;
