const express = require("express");
const router = express();

const User = require("../models/User");

const authGuard = require("../middleware/authGuard");

router.use("/users/auth", require("./UserRoutes"));
router.use("/users", require("./ExpenseRoutes"));

//test
router.get("/", (req, res) => {
  res.send("API Working!");
});

//Private Route
router.get("/users/:id", authGuard, async (req, res) => {
  const id = req.params.id;

  //check if user exists
  const user = await User.findById(id, "-password");

  if (!user) return res.status(404).json({ msg: "Usuário não encontrado!" });

  res.status(200).json({ user });
});

module.exports = router;
