import express from "express";
import exampleRouter from "./routers/exampleRouter.js";

const app = express();

// Config
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/api", exampleRouter);

export default app;
