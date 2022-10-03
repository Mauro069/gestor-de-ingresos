const { model, Schema } = require("mongoose");

const ReportSchema = new Schema(
  {
    userRef: { type: Schema.ObjectId, ref: "User" },
    month: { type: String, required: true },
    initialMoney: { type: Number, required: true },
    currentAmount: { type: Number },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("Report", ReportSchema);
