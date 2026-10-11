
import { beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import app from "../src/app.js";
import { resetTasks } from "../src/tasks.js";

beforeEach(() => {
  resetTasks();
});

describe("Task API", () => {
  it("creates a task with a valid title", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({ title: "Learn TypeScript" });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      title: "Learn TypeScript",
      completed: false,
    });
    expect(response.body.id).toEqual(expect.any(Number));
  });

  it("rejects a missing title", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({});

    expect(response.status).toBe(400);
  });

  it("rejects a bodyless request", async () => {
    const response = await request(app)
      .post("/tasks")
      .set("Content-Type", "application/json");

    expect(response.status).toBe(400);
  });

  it("rejects whitespace-only titles", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({ title: "   " });

    expect(response.status).toBe(400);
  });

  it("rejects titles longer than 100 characters", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({ title: "a".repeat(101) });

    expect(response.status).toBe(400);
  });

  it("returns a created task in the task list", async () => {
    const created = await request(app)
      .post("/tasks")
      .send({ title: "Review Codzee" });

    expect(created.status).toBe(201);

    const listed = await request(app).get("/tasks");

    expect(listed.status).toBe(200);
    expect(listed.body).toContainEqual(created.body);
  });
});
