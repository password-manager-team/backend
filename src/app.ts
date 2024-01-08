import express from "express";
import exampleRouter from "./routers/exampleRouter.js";

const app = express();

// Config

// Routes
app.use(exampleRouter);

export default app;
