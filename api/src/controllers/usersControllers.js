const User = require("../models/UserSchema");

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.json({ msj: "Te falto enviar algun campo" });
    }

    const isExist = await User.findOne({ email });

    if (isExist) {
      res.json({ msj: "Ya existe un usuario con ese correo" });
    }

    const newUser = new User({
      email,
      password,
    });

    await newUser.save();
    res.json({ msj: "Usuario creado correctamente", user: newUser });
  } catch (e) {
    res.json({ msj: "Ocurrio un error", error });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (error) {
    res.json({ msj: "Ocurrio un error", error });
  }
};

const getUserById = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.json({
      msj: "Debes enviar un userId",
    });
  }

  if (!isValidObjectId(userId)) {
    res.json({
      msj: "El userId no es valido",
    });
  }

  try {
    const user = await User.findById(userId);
    res.json({ user });
  } catch (error) {
    res.json({ msj: "Ocurrio un error", error });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
};
