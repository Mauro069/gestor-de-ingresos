const bcrypt = require("bcrypt");
const User = require("../models/UserSchema");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    User.findOne({ email }).then((user) => {
      if (!user) {
        return res.json({ msj: "Usuario no encontrado" });
      }

      bcrypt.compare(password, user.password).then((isCorrect) => {
        if (isCorrect) {
          const token = jwt.sign({ data: user }, "secreto", {
            expiresIn: 86400 /* 24hs */,
          });

          const { password, ...rest } = user._doc;

          res.json({
            msj: "Usuario logeado correctamente",
            user: rest,
            token,
          });
        } else {
          return res.json({ msj: "Contraseña incorrecta" });
        }
      });
    });
  } catch (error) {
    res.json({ msj: "Ocurrio un error", error });
  }
};

const register = async (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (user) {
      return res.json({ msj: "Ya existe un usuario con ese email" });
    }

    if (!email || !password) {
      return res.json({ msj: "Te falto enviar algun campo" });
    }

    bcrypt.hash(password, 10, (error, passwordHasheada) => {
      if (error) res.json({ error });

      const token = jwt.sign({ data: user }, "secreto", {
        expiresIn: 86400 /* 24hs */,
      });

      const newUser = new User({
        email,
        password: passwordHasheada,
      });

      newUser
        .save()
        .then((user) => {
          const { password, ...rest } = user._doc;
          res.json({ msj: "Usuario creado correctamente", user: rest, token });
        })
        .catch((error) => console.error(error));
    });
  });
};

module.exports = { login, register };
