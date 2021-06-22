const express = require("express");
const routers = require("./routers");
const PORT = 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(routers);

app.listen(PORT, () => {
  console.log(`listening to PORT ${PORT}`);
});
