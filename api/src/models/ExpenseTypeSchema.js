const { model, Schema } = require("mongoose");

const ExpenseTypeSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    color: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

module.exports = model("ExpenseType", ExpenseTypeSchema);
