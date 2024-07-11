const request = require("supertest");
const { app, server } = require("../src/index");

describe("routes", () => {
  afterAll((done) => {
    server.close(done);
  });

  it("GET / should return hello world", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "hello world" });
  });

  it("GET /about should return About Us", async () => {
    const response = await request(app).get("/about");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 200, message: "About Us" });
  });

  it("GET /contact should return Contact Us", async () => {
    const response = await request(app).get("/contact");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 200, message: "Contact Us" });
  });

  it("GET /services should return Our Services", async () => {
    const response = await request(app).get("/services");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 200, message: "Our Services" });
  });
});
