const { DB } = require("../DB");

exports.get = (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
};

exports.fetchAccounts = async (req, res, next) => {
  try {
    const data = await DB("accounts");

    res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.fetchBusinessUnits = async (req, res, next) => {
  try {
    const data = await DB("business_units");

    res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.fetchFinancialData = async (req, res, next) => {
  try {
    const { account, business_unit } = req.query;

    if (!account || !business_unit) {
      throw new Error("account & business_unit are required field");
    }

    const data = await DB("financial_datas")
      .innerJoin(
        "accounts",
        "financial_datas.account_id",
        "=",
        "accounts.account_id"
      )
      .innerJoin(
        "business_units",
        "financial_datas.business_unit_id",
        "=",
        "business_units.business_unit_id"
      )
      .innerJoin(
        "scenarios",
        "financial_datas.scenario_id",
        "=",
        "scenarios.scenario_id"
      )
      .innerJoin("months", "financial_datas.month_id", "=", "months.month_id")
      .where("financial_datas.account_id", account)
      .where("financial_datas.business_unit_id", business_unit)
      .orderByRaw(`financial_datas.year desc, financial_datas.month_id desc`);

    res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};
