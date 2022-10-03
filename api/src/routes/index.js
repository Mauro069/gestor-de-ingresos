const { Router } = require("express");
const { login, register, verify } = require("../controllers/authControllers");
const {
  getExpenses,
  createExpense,
  getExpensesByReport,
  getExpensesByExpenseType,
  deleteExpense,
  getPercentageExpense,
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
const verifyToken = require("../middlewares/verifyToken");

const router = Router();

/* Auth */
router.route("/auth/login").post(login);
router.route("/auth/register").post(register);
router.route("/auth/verify").get(verify);

/* Users */
router.route("/users").get(getUsers).post(createUser);
router.route("/users/:userId").get(getUserById);

/* Reports */
router
  .route("/reports")
  .get(verifyToken, getReports)
  .post(verifyToken, createReport);
router.route("/reports/:reportId").get(getReportById);
router.route("/reports/user/:userId").get(verifyToken, getReportsByUserId);

/* Expense Types */
router.route("/expense-types").get(getExpenseTypes).post(createExpenseType);

/* Expenses */
router.route("/expenses").get(getExpenses).post(createExpense);
router
  .route("/expenses/percentage/:reportId")
  .get(getPercentageExpense)
  .post(createExpense);
router.route("/expenses/report/:reportId").get(getExpensesByReport);
router.route("/expenses/:expenseId").delete(deleteExpense);
router
  .route("/expenses/report/:reportId/expense-type/:expenseTypeId")
  .get(getExpensesByExpenseType);

module.exports = router;
