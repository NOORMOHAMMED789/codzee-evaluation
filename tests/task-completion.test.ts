
import { beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import app from "../src/app.js";
import { resetTasks } from "../src/tasks.js";

beforeEach(() => {
  resetTasks();
});

describe("Task completion API", () => {
  it("marks an existing task as completed", async () => {
    const created = await request(app)
      .post("/tasks")
      .send({ title: "Complete this task" });

    const response = await request(app)
      .patch(`/tasks/${created.body.id}/complete`);

    expect(response.status).toBe(200);
    expect(response.body.completed).toBe(true);
  });

  it("returns 404 when the task does not exist", async () => {
    const response = await request(app)
      .patch("/tasks/999/complete");

    expect(response.status).toBe(404);
  });

  it("rejects an invalid task ID", async () => {
    const response = await request(app)
      .patch("/tasks/abc/complete");

    expect(response.status).toBe(400);
  });
});
