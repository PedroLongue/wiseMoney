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
  try {
    console.log("Entrou na função login");

    const { email, password } = req.body;
    console.log("Requisição recebida:", req.body);

    if (!email) {
      console.log("Email ausente");
      return res.status(422).json({ msg: "O email é obrigatório!" });
    }
    if (!password) {
      console.log("Senha ausente");
      return res.status(422).json({ msg: "A senha é obrigatória!" });
    }

    let user;
    try {
      user = await User.findOne({ email: email });
    } catch (err) {
      console.error("Erro ao buscar usuário no banco:", err);
      return res.status(500).json({ msg: "Erro interno ao acessar banco de dados." });
    }
    console.log("Usuário encontrado:", user);

    if (!user) {
      console.log("Usuário não encontrado");
      return res.status(404).json({ msg: "Usuário não encontrado!" });
    }

    let checkPassword;
    try {
      checkPassword = await bcrypt.compare(password, user.password);
    } catch (err) {
      console.error("Erro ao comparar senha:", err);
      return res.status(500).json({ msg: "Erro interno ao validar senha." });
    }
    console.log("Senha válida:", checkPassword);

    if (!checkPassword) {
      console.log("Senha inválida");
      return res.status(422).json({ msg: "Senha inválida!" });
    }

    const secret = process.env.secret;
    console.log("Variável secret:", secret);

    if (!secret) {
      console.log("Variável de ambiente 'secret' não configurada.");
      return res.status(500).json({ msg: "Erro interno: variável de ambiente não definida." });
    }

    let token;
    try {
      token = jwt.sign({ id: user._id }, secret);
    } catch (err) {
      console.error("Erro ao gerar token JWT:", err);
      return res.status(500).json({ msg: "Erro interno ao gerar token." });
    }

    console.log("Token gerado com sucesso");

    res.status(200).json({
      _id: user._id,
      msg: "Autenticação realizada com sucesso!",
      token,
    });
  } catch (error) {
    console.error("Erro inesperado no servidor:", error);
    res.status(500).json({ msg: "Aconteceu um erro no servidor, tente novamente mais tarde!" });
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
