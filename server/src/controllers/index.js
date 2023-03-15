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

    const financialData = await DB("financial_datas")
      .select(
        "financial_datas.id as id",
        "accounts.account_name as account_name",
        "business_units.business_unit_name as business_unit",
        "financial_datas.currency as currency",
        "financial_datas.year as year",
        "scenarios.scenario_name as scenario",
        "months.month_name as month",
        "financial_datas.amount as amount"
      )
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
      .orderByRaw(`financial_datas.year asc, financial_datas.month_id asc`);

    const formattedData = financialData.reduce((result, row) => {
      const {
        id,
        account_name,
        business_unit,
        currency,
        year,
        scenario,
        month,
        amount,
      } = row;
      const index = result.findIndex(
        (item) =>
          item.account_name === account_name &&
          item.business_unit === business_unit &&
          item.currency === currency &&
          item.year === year &&
          item.scenario === scenario
      );
      if (index === -1) {
        result.push({
          id,
          account_name,
          business_unit,
          currency,
          year,
          scenario,
          [month]: amount,
        });
      } else {
        result[index][month] = amount;
      }
      return result;
    }, []);

    res.json({
      data: formattedData,
    });
  } catch (error) {
    next(error);
  }
};
