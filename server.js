const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extends: true }));

app.set("view engine", "ejs");

//use a router
const userRouter = require("./routes/users");
app.use("/users", userRouter);

app.listen(5500);
