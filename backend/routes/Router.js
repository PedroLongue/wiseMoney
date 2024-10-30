const express = require("express");
const router = express();

router.use("/users/auth", require("./UserRoutes"));

//test
router.get("/", (req, res) => {
  res.send("API Working!");
});

//Private Route
router.get("/users/:id", checkToken, async (req, res) => {
  const id = req.params.id;

  //check if user exists
  const user = await User.findById(id, "-password");

  if (!user) return res.status(404).json({ msg: "Usuário não encontrado!" });

  res.status(200).json({ user });
});

function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ msg: "Acesso negado!" });

  try {
    const secret = process.env.secret;
    jwt.verify(token, secret);

    next();
  } catch (error) {
    res.status(400).json({ msg: "Token inválido!" });
  }
}

module.exports = router;
