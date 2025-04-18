// Daniel Adetaba Adongo  worked on the product testing.
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

describe("GET /product/:sellerId", () => {
  it("should return a list of products for a seller", async () => {
    const mockProducts = [
      { id: "67ec87871663f3ed9943ec6f", name: "Product1", sellerId: "67ec87871663f3ed9943ec6f" }
    ];
    const sellerId = "67ec87871663f3ed9943ec6f";

    mongodb.getDatabase().db().collection().find.mockResolvedValue({
      toArray: jest.fn().mockResolvedValue(mockProducts)
    });

    const response = await request(app).get(`/product/${sellerId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockProducts);
  });
});

describe("GET /product/:sellerId/:productId", () => {
  it("should return a single product", async () => {
    const mockProduct = { id: "67ec87871663f3ed9943ec6f", name: "Product1", sellerId: "67ec87871663f3ed9943ec6f" };
    const sellerId = "67ec87871663f3ed9943ec6f";
    const productId = "67ec87871663f3ed9943ec6f";

    mongodb.getDatabase().db().collection().find.mockResolvedValue({
      toArray: jest.fn().mockResolvedValue([mockProduct])
    });

    const response = await request(app).get(`/product/${sellerId}/${productId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockProduct);
  });
});
