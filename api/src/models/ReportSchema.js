const { model, Schema } = require("mongoose");

const ReportSchema = new Schema(
  {
    userRef: { type: Schema.ObjectId, ref: "User" },
    month: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Report", ReportSchema);
