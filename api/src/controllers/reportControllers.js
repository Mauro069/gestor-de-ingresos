const { isValidObjectId } = require("mongoose");
const Report = require("../models/ReportSchema");

const createReport = async (req, res) => {
  try {
    const { userRef, month, initialMoney } = req.body;

    if (!userRef || !month || !initialMoney) {
      res.json({ msj: "Te falto enviar algun campo" });
    }

    if (!isValidObjectId(userRef)) {
      res.json({
        msj: "El user ref no es valido",
      });
    }

    const newReport = new Report({
      userRef,
      month,
      initialMoney,
      currentAmount: initialMoney,
    });

    await newReport.save();
    res.json({ msj: "Reporte creado correctamente", report: newReport });
  } catch (error) {
    res.json({ msj: "Ocurrio un error", error });
  }
};

const getReports = async (req, res) => {
  try {
    const reports = await Report.find().populate("userRef");
    res.json({ reports });
  } catch (error) {
    res.json({ msj: "Ocurrio un error", error });
  }
};

const getReportById = async (req, res) => {
  const { reportId } = req.params;

  if (!reportId) {
    return res.json({
      msj: "Debes enviar un reportId",
    });
  }

  if (!isValidObjectId(reportId)) {
    return res.json({
      msj: "El reportId no es valido",
    });
  }

  try {
    const report = await Report.findById(reportId).populate("userRef");
    res.json({ report });
  } catch (error) {
    res.json({ msj: "Ocurrio un error", error });
  }
};

const getReportsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
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

    const reports = await Report.find({ userRef: userId });
    res.json({ reports });
  } catch (error) {
    res.json({ msj: "Ocurrio un error", error });
  }
};

const deleteReportById = async (req, res) => {
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
    const reportDeleted = await Report.findByIdAndDelete(reportId);
    res.json({
      msj: "El reporte fue eliminado correctamente",
      reportDeleted,
    });
  } catch (error) {
    res.json({ msj: "Ocurrio un error", error });
  }
};

module.exports = {
  createReport,
  getReports,
  getReportById,
  getReportsByUserId,
  deleteReportById,
};
