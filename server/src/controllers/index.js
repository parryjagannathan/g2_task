const { DB } = require("../DB");

exports.get = (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
};

exports.fetchAccounts = async (req, res, next) => {
  try {
    const data = await DB("financials").pluck("account").distinct();

    res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.fetchBusinessUnits = async (req, res, next) => {
  try {
    const data = await DB("financials").pluck("business_unit").distinct();

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

    const data = await DB("financials").where({
      account,
      business_unit,
    });

    res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};
