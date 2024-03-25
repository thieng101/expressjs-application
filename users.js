const express = require("express");
const router = express.Router();

router.use(logger);

function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}

const users = [{ name: "Yohan" }, { name: "Thy" }];

router.param("id", (req, res, next, id) => {
  req.user = users[id];
  next();
});

//make sure to put static routes in front of dynamic routes
//so that it wont take any parameter as id
router.get("/", (req, res) => {
  console.log(req.query.name);
  res.send("User List");
});

router.get("/new", (req, res) => {
  res.render("users/new");
});

router.post("/", (req, res) => {
  const isValid = true;
  if (isValid) {
    users.push({ firstName: req.body.firstName });
    res.redirect(`/users/${users.length - 1}`);
  } else {
    console.log("Error");
    res.render("users/new", { firstName: req.body.firstName });
  }
});

router
  .route("/:id")
  .get((req, res) => {
    console.log(req.user);
    res.send(`Get User With ID ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`Update User With ID ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`Delete User With ID ${req.params.id}`);
  });

module.exports = router;
