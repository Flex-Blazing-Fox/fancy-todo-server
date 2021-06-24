const routers = require("express").Router();
const userRouter = require("./userRouter");
const todoRouter = require("./todoRouter");
const auth = require("../middlewares/auth");


routers.get("/", (_, res) => res.status(200).send("Welcome"));

routers.use("/user", userRouter);
routers.use("/todo", todoRouter);

module.exports = routers;
