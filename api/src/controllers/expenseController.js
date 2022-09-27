const { isValidObjectId } = require("mongoose");
const Expense = require("../models/ExpenseSchema");

const createExpense = async (req, res) => {
  try {
    const { reportRef, description, date, type } = req.body;

    if (!reportRef || !description || !date || !type) {
      res.json({ msj: "Te falto enviar algun campo" });
    }

    if (!isValidObjectId(reportRef) || !isValidObjectId(type)) {
      res.json({
        msj: "El report ref o el tipo de gasto no es valido",
      });
    }

    const newExpense = new Expense({
      reportRef,
      description,
      date,
      type,
    });

    await newExpense.save();
    res.json({ msj: "Gasto cargado correctamente", expense: newExpense });
  } catch (error) {
    res.json({ msj: "Ocurrio un error", error });
  }
};

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().populate(["reportRef", "type"]);
    res.json({ expenses });
  } catch (error) {
    res.json({ msj: "Ocurrio un error", error });
  }
};

const getExpensesByReport = async (req, res) => {
  const { reportId } = req.params;

  if (!reportId) {
    res.json({
      msj: "Debes enviar un reportId",
    });
  }

  if (!isValidObjectId(reportId)) {
    res.json({
      msj: "El reportId no es valido",
    });
  }

  try {
    const expenses = await Expense.find({
      reportRef: reportId,
    }).populate("type");

    res.json({ expenses });
  } catch (error) {
    res.json({ msj: "Ocurrio un error", error });
  }
};

const getExpensesByExpenseType = async (req, res) => {
  const { reportId, expenseTypeId } = req.params;

  if (!reportId && !expenseTypeId) {
    res.json({
      msj: "Debes enviar un reportId y un expenseTypeId",
    });
  }

  if (!isValidObjectId(reportId) || !isValidObjectId(expenseTypeId)) {
    res.json({
      msj: "El reportId o el expenseTypeId no es valido",
    });
  }

  try {
    const expenses = await Expense.find({
      reportRef: reportId,
      type: expenseTypeId,
    }).populate(["reportRef", "type"]);

    res.json({ expenses });
  } catch (error) {
    res.json({ msj: "Ocurrio un error", error });
  }
};

module.exports = {
  createExpense,
  getExpenses,
  getExpensesByReport,
  getExpensesByExpenseType,
};
