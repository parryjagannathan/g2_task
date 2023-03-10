const express = require("express");

const router = express.Router();

const RouteController = require("../controllers");

router.get("/", RouteController.get);
router.get("/accounts", RouteController.fetchAccounts);
router.get("/business_units", RouteController.fetchBusinessUnits);
router.get("/finance_data", RouteController.fetchFinancialData);

module.exports = router;
