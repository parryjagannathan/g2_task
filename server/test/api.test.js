const request = require("supertest");
const app = require("../src/app");
// const RouteController = require("../controllers/RouteController");
const { DB } = require("../src/DB");
describe("get", () => {
  it("should return a message", async () => {
    const res = await request(app).get("/api/v1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "API - 👋🌎🌍🌏");
  });
});

describe("financial data apis", () => {
  it("should return an array of accounts", async () => {
    const mockData = [
      "Commissions Expense",
      "Software/Hardware Expense",
      "Sales",
      "Cost of Goods Sold",
      "Consulting Expense",
      "R&D Expense",
      "Payroll Expense",
      "Marketing Expense",
      "Travel & Entertainment Expense",
    ];
    jest.spyOn(DB("financials"), "pluck").mockReturnValueOnce(mockData);
    const res = await request(app).get("/api/v1/accounts");
    console.log("res", res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty(
      "data",
      mockData.map((item) => item)
    );
  });

  it("should return an array of business units", async () => {
    const mockData = ["Advertising", "Software", "Hardware"];
    jest.spyOn(DB("financials"), "pluck").mockReturnValueOnce(mockData);
    const res = await request(app).get("/api/v1/business_units");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty(
      "data",
      mockData.map((item) => item)
    );
  });
});
