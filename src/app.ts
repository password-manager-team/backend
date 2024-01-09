import express from "express";
import exampleRouter from "./routers/exampleRouter.js";

const app = express();

// Config

// Routes
app.use("/api", exampleRouter);

export default app;
