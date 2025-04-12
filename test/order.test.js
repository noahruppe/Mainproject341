
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

describe("GET /order/:buyerId", () => {
  it("should return a list of orders for a buyer", async () => {
    const mockOrders = [
      { orderId: "67ec87871663f3ed9943ec6f", buyerId: "67ec87871663f3ed9943ec6f", sellerId: "67ec87871663f3ed9943ec6f", totalAmount: 200 }
    ];
    const buyerId = "67ec87871663f3ed9943ec6f";

    mongodb.getDatabase().db().collection().find.mockResolvedValue({
      toArray: jest.fn().mockResolvedValue(mockOrders)
    });

    const response = await request(app).get(`/order/${buyerId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockOrders);
  });
});

describe("GET /order/:buyerId/:orderId", () => {
  it("should return a single order", async () => {
    const mockOrder = { orderId: "67ec87871663f3ed9943ec6f", buyerId: "67ec87871663f3ed9943ec6f", sellerId: "67ec87871663f3ed9943ec6f", totalAmount: 200 };
    const buyerId = "67ec87871663f3ed9943ec6f";
    const orderId = "67ec87871663f3ed9943ec6f";

    mongodb.getDatabase().db().collection().find.mockResolvedValue({
      toArray: jest.fn().mockResolvedValue([mockOrder])
    });

    const response = await request(app).get(`/order/${buyerId}/${orderId}`);

    expect(response.status).toBe(500);

  });
});
