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
            ok: true,
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
          res.json({
            ok: true,
            msj: "Usuario creado correctamente",
            user: rest,
            token,
          });
        })
        .catch((error) => console.error(error));
    });
  });
};

const verify = async (req, res) => {
  const token = req.headers["token"];

  if (token) {
    jwt.verify(token, "secreto", (error, data) => {
      if (error) return res.status(400).json({ msj: "Token invalido" });
      else {
        const token = jwt.sign({ data: data?.data }, "secreto", {
          expiresIn: 86400 /* 24hs */,
        });

        res.json({
          msj: "Token valido",
          token,
          user: { _id: data?.data?._id, email: data?.data?.email },
        });
      }
    });
  } else {
    res.status(400).json({ msj: "Debes enviar un token" });
  }
};

module.exports = { login, register, verify };
