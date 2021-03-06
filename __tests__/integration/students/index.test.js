const supertest = require("supertest");
const mongoose = require("mongoose");
const Student = require("../../../src/models/student");
const app = require("../../../src/app");

const request = supertest(app);

describe("students", () => {
  // hooks => life cycle methods
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__);
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });
  describe("Creat", () => {
    beforeEach(async () => {
      await Student.deleteMany({});
    });
    it("should have the student if request is valid", async () => {
      const body = {
        firstName: "xxx",
        lastName: "yyy",
        email: "xxx@example.com",
      };
      const res = await request.post("/v1/students").send(body);
      expect(res.statusCode).toBe(201);
      // check response format
      // check response id
      const student = await Student.findOne(body).exec();
      expect(student).toBeTruthy();
    });

    // DRY do not repeat yourself
    it.each`
      field        | value
      ${firstName} | ${undefined}
      ${email}     | ${"a"}
    `("should return 400 when $field is $value", async ({ field, value }) => {
      const body = {
        firstName: "xxx",
        lastName: "yyy",
        email: "xxx@example.com",
      };
      const invalidBody = { ...body, [field]: value };
      const res = await request.post("/v1/students").setEncoding(invalidBody);
      expect(res.statusCode).toBe(400);
    });
  });
});
