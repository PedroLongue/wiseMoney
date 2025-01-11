const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//Models
const User = require("../models/User");

//Register User
const register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  //validations
  if (!name) return res.status(422).json({ msg: "O nome é obrigatório!" });
  if (!email) return res.status(422).json({ msg: "O email é obrigatório!" });
  if (!password) return res.status(422).json({ msg: "A senha é obrigatória!" });
  if (!confirmPassword)
    return res
      .status(422)
      .json({ msg: "A confirmação de senha é obrigatória!" });

  if (password !== confirmPassword)
    return res.status(422).json({ msg: "As senhas não conferem!" });

  // check if user exists
  const userExists = await User.findOne({ email: email });

  if (userExists)
    return res.status(422).json({ msg: "Por favor, utilize outro email!" });

  // create password
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  // Create User
  const user = new User({
    name,
    email,
    password: passwordHash,
  });

  try {
    await user.save();
    res.status(201).json({ _id: user._id, msg: "Usuário criado com sucesso!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Aconteceu um erro no servidor, tente novamente mais tarde!",
    });
  }
};

// Login User
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(422).json({ msg: "O email é obrigatório!" });
  if (!password) return res.status(422).json({ msg: "A senha é obrigatória!" });

  // check if user exists
  const user = await User.findOne({ email: email });

  if (!user) return res.status(404).json({ msg: "Usuário não encontrado!" });

  // check if password match
  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) return res.status(422).json({ msg: "Senha inválida!" });

  console.log("secret: ", process.env.secret);
  console.log("Início do login - corpo recebido:", req.body);
  try {
    const secret = process.env.secret;
    const token = jwt.sign(
      {
        id: user._id,
      },
      secret
    );

    res.status(200).json({
      _id: user._id,
      msg: "Autenticação realizada com sucesso!",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Acontecey um erro no servidor, tente novamente mais tarde!",
    });
  }
};

const getCurrentUser = async (req, res) => {
  if (!req.user) {
    return res.status(404).json({ msg: "Usuário não encontrado." });
  }

  res.status(200).json(req.user);
};

module.exports = {
  login,
  register,
  getCurrentUser,
};
