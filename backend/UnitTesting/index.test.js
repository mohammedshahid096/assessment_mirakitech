const app = require("../index");
const request = require("supertest");
const mongoose = require("mongoose");
const Token = require("../Middlewarers/TokenMiddleware");

beforeEach(async () => {
  await mongoose.connect(process.env.DBCONNECTION_URL);
  // let AuthToken = Token.createToken("test1@gmail.com");
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("User Routes Testing", () => {
  describe("POST /api/v1/user ", () => {
    describe("------Register-------", () => {
      test("should return an error with **Enter the required fields**", async () => {
        const res = await request(app)
          .post("/api/v1/user/register")
          .send({ email: "unitTesting1@gmail.com" });
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe("Enter the required fields");
      });

      test("should allow a user to login with correct credentials", async () => {
        const res = await request(app).post("/api/v1/user/register").send({
          email: "unitTesting1@gmail.com",
          password: "12345678",
          name: "unitTesting101",
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.user).toEqual(expect.any(Object));
        expect(res.body.token).toEqual(expect.any(String));
      });

      test("should return an error with **Email Already Exist**", async () => {
        const res = await request(app).post("/api/v1/user/register").send({
          email: "unitTesting1@gmail.com",
          password: "12345678",
          name: "unitTesting-2",
        });
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe("Email Already exist");
      });
    });

    describe("----Login---------", () => {
      test("should return an error with Enter the required fields", async () => {
        const res = await request(app)
          .post("/api/v1/user/login")
          .send({ email: "unitTesting1@gmail.com" });
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe("Enter the required fields");
      });

      test("should return an error with wrong credentials", async () => {
        const res = await request(app)
          .post("/api/v1/user/login")
          .send({ email: "unitTesting1@gmail.com", password: "testpassword" });
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe("Email or Password is not match");
      });

      test("should allow a user to login with correct credentials", async () => {
        const res = await request(app)
          .post("/api/v1/user/login")
          .send({ email: "unitTesting1@gmail.com", password: "12345678" });
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.user).toEqual(expect.any(Object));
        expect(res.body.token).toEqual(expect.any(String));
      });
    });
  });
});

// describe("Task Routes Testing", () => {
//   let authToken;
//   beforeAll(async () => {
//     authToken = await Token.createToken("test1@gmail.com");
//   });

//   describe("POST  /api/v1/todo ", () => {
//     describe("----Add Task-----", () => {
//       test("should add the task to a database", async () => {
//         const res = await request(app)
//           .post("/api/v1/todo/add")
//           .set("Cookie", [`AssesToken=${authToken}`])
//           .send({
//             title: "testing Working",
//             description: "i wanted todo a unit testing using JEST",
//           });

//         expect(res.statusCode).toBe(201);

//         expect(res.body.success).toBe(true);
//       });

// test("should return the array", async () => {
//   try {
//     const res = await request(app)
//       .get("/api/v1/todo")
//       .set("Cookie", [`AssesToken=${authToken}`]);

//     expect(res.statusCode).toBe(200);
//     expect(res.body.success).toBe(true);
//     expect(res.body.userTasks).toEqual(expect.any(Array));
//     expect(res.body.noOfTasks).toEqual(expect.any(Number));
//   } catch (error) {
//     console.log(error.message);
//   }
// });
//     });
//   });
// });
