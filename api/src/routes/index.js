const { Router } = require("express");
const {
  getExpenses,
  createExpense,
  getExpensesByReport,
  getExpensesByExpenseType,
} = require("../controllers/expenseController");
const {
  getExpenseTypes,
  createExpenseType,
} = require("../controllers/expenseTypeControllers");
const {
  getReports,
  createReport,
  getReportById,
  getReportsByUserId,
} = require("../controllers/reportControllers");
const {
  getUsers,
  createUser,
  getUserById,
} = require("../controllers/usersControllers");

const router = Router();

/* Users */
router.route("/users")
  .get(getUsers)
  .post(createUser);
router.route("/users/:userId")
  .get(getUserById);

/* Reports */
router.route("/reports")
  .get(getReports)
  .post(createReport);
router.route("/reports/:reportId")
  .get(getReportById);
router.route("/reports/user/:userId")
  .get(getReportsByUserId);

/* Expense Types */
router.route("/expense-types")
  .get(getExpenseTypes)
  .post(createExpenseType);

/* Expenses */
router.route("/expenses")
  .get(getExpenses)
  .post(createExpense);
router.route("/expenses/report/:reportId")
  .get(getExpensesByReport);
router.route("/expenses/report/:reportId/expense-type/:expenseTypeId")
  .get(getExpensesByExpenseType);

module.exports = router;
