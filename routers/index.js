const routers = require("express").Router();
const userRouter = require("./userRouter");
const todoRouter = require("./todoRouter");
const authentication = require("../middlewares/authentication");
const router = require("./userRouter");

routers.get("/", (_, res) => res.status(200).send("Welcome"));

routers.use("/user", userRouter);
routers.use(authentication);
routers.use("/todo", todoRouter);

module.exports = routers;
