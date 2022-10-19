const { isValidObjectId } = require("mongoose");
const Expense = require("../models/ExpenseSchema");
const ExpenseType = require("../models/ExpenseTypeSchema");
const Report = require("../models/ReportSchema");

const createExpense = async (req, res) => {
  try {
    const { reportRef, description, date, type, amount } = req.body;

    if (!reportRef || !description || !date || !type || !amount) {
      return res.json({ msj: "Te falto enviar algun campo" });
    }

    if (!isValidObjectId(reportRef) || !isValidObjectId(type)) {
      return res.json({
        msj: "El report ref o el tipo de gasto no es valido",
      });
    }

    const newExpense = new Expense({
      reportRef,
      description,
      date,
      type,
      amount,
    });

    const reportFind = await Report.findById(reportRef);
    const newAmount = reportFind.currentAmount - amount;

    reportFind.currentAmount = newAmount;
    await reportFind.save();
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
    })
      .populate("type")
      .sort({ date: -1 });

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

const getPercentageExpense = async (req, res) => {
  const { reportId } = req.params;

  const reportFind = await Report.findById(reportId);
  const expenseTypes = await ExpenseType.find();
  const expenseTypesNames = expenseTypes.map((exp) => exp._id);

  const expensesSeparated = [];

  if (reportId) {
    for (let i = 0; i < expenseTypesNames.length; i++) {
      let expensesByType = await Expense.find({
        type: expenseTypesNames[i],
        reportRef: reportId,
      });
      let value = expensesByType.reduce(
        (previousValue, currentValue) =>
          Number(previousValue) + Number(currentValue.amount),
        0
      );

      expensesSeparated.push({
        value: Math.round(
          (value * 100) / (reportFind.initialMoney - reportFind.currentAmount)
        ),
        name: expenseTypes[i].name,
        color: expenseTypes[i].color,
      });
    }

    res.json({
      expensesSeparated: expensesSeparated.filter((exp) => exp.value > 0),
    });
  } else {
    res.json({ msj: "Debes enviar un reportId" });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;
    const expenseFind = await Expense.findById(expenseId);

    const reportFind = await Report.findById({ _id: expenseFind.reportRef });

    const newAmount = reportFind.currentAmount + expenseFind.amount;
    reportFind.currentAmount = newAmount;
    await reportFind.save();

    await Expense.findByIdAndDelete(expenseFind);
    res.json({
      msj: "Gasto eliminado correctamente",
      expenseDeleted: expenseFind,
    });
  } catch (error) {
    res.json({ msj: "Ocurrio un error", error });
  }
};

module.exports = {
  createExpense,
  getExpenses,
  getExpensesByReport,
  getExpensesByExpenseType,
  getPercentageExpense,
  deleteExpense,
};
