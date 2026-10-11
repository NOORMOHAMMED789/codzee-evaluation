
import { describe, expect, it } from "vitest";
import request from "supertest";
import app from "../src/app.js";

describe("Task pagination API", () => {
    it("returns the default first page", async () => {
        const response = await request(app).get("/tasks");

        expect(response.status).toBe(200);
        expect(response.body.items).toHaveLength(10);
        expect(response.body.total).toBe(25);
        expect(response.body.limit).toBe(10);
        expect(response.body.offset).toBe(0);
    });

    it("returns the requested page", async () => {
        const response = await request(app)
            .get("/tasks?limit=5&offset=10");

        expect(response.status).toBe(200);
        expect(response.body.items).toHaveLength(5);
        expect(response.body.items[0].id).toBe(11);
    });

    it("returns an empty page beyond the end", async () => {
        const response = await request(app)
            .get("/tasks?limit=10&offset=100");

        expect(response.status).toBe(200);
        expect(response.body.items).toEqual([]);
        expect(response.body.total).toBe(25);
    });

    it("accepts the minimum limit", async () => {
        const response = await request(app).get("/tasks?limit=1");

        expect(response.status).toBe(200);
        expect(response.body.items).toHaveLength(1);
    });

    it("accepts the maximum limit", async () => {
        const response = await request(app).get("/tasks?limit=100");

        expect(response.status).toBe(200);
        expect(response.body.items).toHaveLength(25);
    });

    it("rejects an unsafe integer offset", async () => {
        const response = await request(app).get(
            "/tasks?offset=9007199254740993",
        );

        expect(response.status).toBe(400);
    });


    it.each([
        "offset=-1",
        "limit=abc",
        "limit=1e1",
        "offset=0x10",
        "offset=",
        "limit=1&limit=2",
    ])("rejects malformed or invalid query: %s", async (query) => {
        const response = await request(app).get(`/tasks?${query}`);

        expect(response.status).toBe(400);
    });


    it.each([
        ["zero limit", "limit=0"],
        ["negative limit", "limit=-1"],
        ["excessive limit", "limit=101"],
        ["fractional offset", "offset=1.5"],
        ["nonnumeric offset", "offset=abc"],
    ])("rejects %s", async (_description, query) => {
        const response = await request(app).get(`/tasks?${query}`);

        expect(response.status).toBe(400);
    });
});
