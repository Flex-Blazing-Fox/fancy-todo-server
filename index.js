const express = require("express");
const routers = require("./routers");
const errorHandler = require("./middlewares/errorHandler");
const PORT = 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routers);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening to PORT ${PORT}`);
});
