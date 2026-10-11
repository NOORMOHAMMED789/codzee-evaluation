import { Router } from "express";
import { getTasksPage } from "./tasks.js";

const router = Router();

router.get("/", (req, res) => {
  const rawLimit = req.query.limit;
  const rawOffset = req.query.offset;

  const limit = rawLimit === undefined ? 10 : Number(rawLimit);
  const offset = rawOffset === undefined ? 0 : Number(rawOffset);

  if (
    !Number.isInteger(limit) ||
    limit < 1 ||
    limit > 100 ||
    !Number.isInteger(offset) ||
    offset < 0
  ) {
    return res.status(400).json({
      error: "limit must be 1-100 and offset must be a non-negative integer",
    });
  }

  return res.status(200).json(getTasksPage(limit, offset));
});

export default router;
