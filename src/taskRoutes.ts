
import { Router } from "express";
import { getTasksPage } from "./tasks.js";

const router = Router();

function parseIntegerQuery(
  value: unknown,
  defaultValue: number,
): number | null {
  if (value === undefined) {
    return defaultValue;
  }

  if (typeof value !== "string" || !/^\d+$/.test(value)) {
    return null;
  }

  const parsed = Number(value);

  return Number.isSafeInteger(parsed) ? parsed : null;
}

router.get("/", (req, res) => {
  const limit = parseIntegerQuery(req.query.limit, 10);
  const offset = parseIntegerQuery(req.query.offset, 0);

  if (
    limit === null ||
    limit < 1 ||
    limit > 100 ||
    offset === null
  ) {
    return res.status(400).json({
      error: "limit must be 1-100 and offset must be a non-negative integer",
    });
  }

  return res.status(200).json(getTasksPage(limit, offset));
});

export default router;
