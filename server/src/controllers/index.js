const { DB } = require("../DB");

exports.get = (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
};

exports.fetchAccounts = async (req, res) => {
  const data = await DB("financials").pluck("account").distinct();

  res.json({
    data,
  });
};

exports.fetchBusinessUnits = async (req, res) => {
  const data = await DB("financials").pluck("business_unit").distinct();

  res.json({
    data,
  });
};

exports.fetchFinancialData = async (req, res) => {
  const { account, business_unit } = req.query;

  const data = await DB("financials").where({
    account,
    business_unit,
  });

  res.json({
    data,
  });
};
