const { model, Schema } = require("mongoose");

const ExpenseSchema = new Schema(
  {
    reportRef: { type: Schema.ObjectId, ref: "Report" },
    description: { type: String, required: true },
    date: { type: String, required: true },
    type: { type: Schema.ObjectId, ref: "ExpenseType" },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Expense", ExpenseSchema);
