
import { beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import app from "../src/app.js";

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

  it("returns the task list", async () => {
    const response = await request(app).get("/tasks");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
