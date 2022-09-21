const ExpenseType = require("../models/ExpenseTypeSchema");

const createExpenseType = async (req, res) => {
  try {
    const { name, color } = req.body;

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
    res.send("Ocurrio un Error", e);
  }
};

const getExpenseTypes = async (req, res) => {
  const expenseTypes = await ExpenseType.find();
  res.json({ expenseTypes });
};

module.exports = {
  createExpenseType,
  getExpenseTypes,
};
