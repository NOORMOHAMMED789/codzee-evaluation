import { Router } from "express";
import { completeTask, createTask, getTasks } from "./tasks.js";

const router = Router();


router.post("/", (req, res) => {
  const title = req.body?.title;

  if (typeof title !== "string") {
    return res.status(400).json({
      error: "Title is required and must be a string",
    });
  }

  const normalizedTitle = title.trim();

  if (normalizedTitle.length === 0) {
    return res.status(400).json({
      error: "Title cannot be empty",
    });
  }

  if (normalizedTitle.length > 100) {
    return res.status(400).json({
      error: "Title must be 100 characters or fewer",
    });
  }

  const task = createTask(normalizedTitle);

  return res.status(201).json(task);
});


router.patch("/:id/complete", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      error: "Task ID must be a positive integer",
    });
  }

  const task = completeTask(id);

  if (!task) {
    return res.status(404).json({
      error: "Task not found",
    });
  }

  return res.status(200).json(task);
});

router.get("/", (_req, res) => {
  return res.status(200).json(getTasks());
});

export default router;
