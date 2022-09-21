const { Router } = require("express");
const {
  getExpenses,
  createExpense,
  getExpensesByReport,
} = require("../controllers/expenseController");
const {
  getExpenseTypes,
  createExpenseType,
} = require("../controllers/expenseTypeControllers");
const {
  getReports,
  createReport,
} = require("../controllers/reportControllers");
const { getUsers, createUser } = require("../controllers/usersControllers");

const router = Router();

router.route("/users").get(getUsers).post(createUser);
router.route("/expense-types").get(getExpenseTypes).post(createExpenseType);
router.route("/reports").get(getReports).post(createReport);
router.route("/expenses").get(getExpenses).post(createExpense);
router.route("/expenses/:userId").get(getExpensesByReport);

module.exports = router;
