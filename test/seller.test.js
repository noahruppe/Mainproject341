// Noah Ruppe did this page
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

describe("GET /seller", () => {
  it("should return a list of sellers", async () => {
    const mockSellers = [
      { id: "67ec87871663f3ed9943ec6f", firstName: "John", lastName: "Doe", userName: "johndoe" }
    ];

    mongodb.getDatabase().db().collection().find.mockResolvedValue({
      toArray: jest.fn().mockResolvedValue(mockSellers)
    });

    const response = await request(app).get("/seller");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockSellers);
  });
});

describe("GET /seller/:id", () => {
  it("should return a single seller", async () => {
    const mockSeller = { id: "67ec87871663f3ed9943ec6f", firstName: "John", lastName: "Doe", userName: "johndoe" };
    const sellerId = "67ec87871663f3ed9943ec6f";

    mongodb.getDatabase().db().collection().find.mockResolvedValue({
      toArray: jest.fn().mockResolvedValue([mockSeller])
    });

    const response = await request(app).get(`/seller/${sellerId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockSeller);
  });
});
