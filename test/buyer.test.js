// Noah Ruppe did this whole page
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

describe("GET /buyer", () => {
  it("should return a list of buyers", async () => {
    const mockBuyers = [
      { id: "67ec87871663f3ed9943ec6f", firstName: "John", lastName: "Doe", userName: "johndoe" }
    ];

    mongodb.getDatabase().db().collection().find.mockResolvedValue({
      toArray: jest.fn().mockResolvedValue(mockBuyers)
    });

    const response = await request(app).get("/buyer");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockBuyers);
  });
});

describe("GET /buyer/:id", () => {
  it("should return a single buyer", async () => {
    const mockBuyer = { id: "67ec87871663f3ed9943ec6f", firstName: "John", lastName: "Doe", userName: "johndoe" };
    const buyerId = "67ec87871663f3ed9943ec6f";

    mongodb.getDatabase().db().collection().find.mockResolvedValue({
      toArray: jest.fn().mockResolvedValue([mockBuyer])
    });

    const response = await request(app).get(`/buyer/${buyerId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockBuyer);
  });
});
