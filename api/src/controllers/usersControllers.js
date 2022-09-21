const User = require("../models/UserSchema");

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const newUser = new User({
      email,
      password,
    });

    await newUser.save();
    res.json({ msj: "Usuario creado correctamente", user: newUser });
  } catch (e) {
    res.send("Ocurrio un Error", e);
  }
};

const getUsers = async (req, res) => {
  const users = await User.find();
  res.json({ users });
};

module.exports = {
  createUser,
  getUsers,
};
