const Expense = require("../models/ExpenseSchema");

const createExpense = async (req, res) => {
  try {
    const { reportRef, description, date, type } = req.body;

    const newExpense = new Expense({
      reportRef,
      description,
      date,
      type,
    });

    await newExpense.save();
    res.json({ msj: "Gasto cargado correctamente", expense: newExpense });
  } catch (e) {
    res.send("Ocurrio un Error", e);
  }
};

const getExpenses = async (req, res) => {
  const expenses = await Expense.find().populate(["reportRef", "type"]);
  res.json({ expenses });
};

const getExpensesByReport = async (req, res) => {
  const { userId } = req.params;

  const expenses = await Expense.find({
    reportRef: userId,
  }).populate(["reportRef", "type"]);
  res.json({ expenses });
};

module.exports = {
  createExpense,
  getExpenses,
  getExpensesByReport,
};
