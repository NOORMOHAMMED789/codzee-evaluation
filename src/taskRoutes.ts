import { Router } from "express";
import { createTask, getTasks } from "./tasks.js";

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

router.get("/", (_req, res) => {
  return res.status(200).json(getTasks());
});

export default router;
