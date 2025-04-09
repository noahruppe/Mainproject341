const request = require("supertest");
const app = require("../app");
const mongodb = require("../data/database");

jest.mock("../data/database", () => ({
  getDatabase: jest.fn().mockReturnValue({
    db: jest.fn().mockReturnValue({
      collection: jest.fn().mockReturnValue({
        find: jest.fn(),
        insertOne: jest.fn(),
        updateOne: jest.fn(),
        deleteOne: jest.fn()
      })
    })
  })
}));

describe("GET /payment/:buyerId", () => {
  it("should return a list of payments for a buyer", async () => {
    const mockPayments = [
      { paymentId: "67ec87871663f3ed9943ec6f", buyerId: "67ec87871663f3ed9943ec6f", amount: 200, paymentMethod: "credit" }
    ];
    const buyerId = "67ec87871663f3ed9943ec6f";

    mongodb.getDatabase().db().collection().find.mockResolvedValue({
      toArray: jest.fn().mockResolvedValue(mockPayments)
    });

    const response = await request(app).get(`/payment/${buyerId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockPayments);
  });
});

describe("GET /payment/:buyerId/:id", () => {
  it("should return a single payment", async () => {
    const mockPayment = { paymentId: "67ec87871663f3ed9943ec6f", buyerId: "67ec87871663f3ed9943ec6f", amount: 200, paymentMethod: "credit" };
    const buyerId = "67ec87871663f3ed9943ec6f";
    const paymentId = "67ec87871663f3ed9943ec6f";

    mongodb.getDatabase().db().collection().find.mockResolvedValue({
      toArray: jest.fn().mockResolvedValue([mockPayment])
    });

    const response = await request(app).get(`/payment/${buyerId}/${paymentId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockPayment);
  });
});
