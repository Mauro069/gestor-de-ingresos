const ExpenseType = require("../models/ExpenseTypeSchema");

const createExpenseType = async (req, res) => {
  try {
    const { name, color } = req.body;

    if (!name || !color) {
      res.json({ msj: "Te falto enviar algun campo" });
    }

    const newExpenseType = new ExpenseType({
      name,
      color,
    });

    await newExpenseType.save();
    res.json({
      msj: "Tipo de gasto creado correctamente",
      expenseType: newExpenseType,
    });
  } catch (e) {
    res.json({ msj: "Ocurrio un error", error });
  }
};

const getExpenseTypes = async (req, res) => {
  try {
    const expenseTypes = await ExpenseType.find();
    res.json({ expenseTypes });
  } catch (error) {
    res.json({ msj: "Ocurrio un error", error });
  }
};

module.exports = {
  createExpenseType,
  getExpenseTypes,
};
