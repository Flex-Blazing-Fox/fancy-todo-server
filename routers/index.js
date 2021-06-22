const routers = require("express").Router();
const todoRouter = require("./todoRouter");

routers.use("/todo", todoRouter);
routers.get("/", (_, res) => res.status(200).send("Welcome"));

module.exports = routers;
