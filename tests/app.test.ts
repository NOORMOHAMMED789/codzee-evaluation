import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";

describe("Health endpoint", () => {
  it("returns a successful health response", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "ok",
      service: "codzee-evaluation",
    });
  });
});
