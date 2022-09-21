const Report = require("../models/ReportSchema");

const createReport = async (req, res) => {
  try {
    const { userRef, month } = req.body;

    const newReport = new Report({
      userRef,
      month,
    });

    await newReport.save();
    res.json({ msj: "Reporte creado correctamente", user: newReport });
  } catch (e) {
    res.send("Ocurrio un Error", e);
  }
};

const getReports = async (req, res) => {
  const reports = await Report.find().populate("userRef");
  res.json({ reports });
};

module.exports = {
  createReport,
  getReports,
};
