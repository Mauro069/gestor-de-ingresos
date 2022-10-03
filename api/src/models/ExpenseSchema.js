const { model, Schema } = require("mongoose");

const ExpenseSchema = new Schema(
  {
    date: { type: String, required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    type: { type: Schema.ObjectId, ref: "ExpenseType", required: true },
    reportRef: { type: Schema.ObjectId, ref: "Report", required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("Expense", ExpenseSchema);
