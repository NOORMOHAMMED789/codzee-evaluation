import express from "express";
import taskRoutes from "./taskRoutes.js";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "codzee-evaluation",
  });
});

app.use("/tasks", taskRoutes);


export default app;
