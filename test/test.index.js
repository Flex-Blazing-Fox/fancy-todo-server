process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const { describe } = require("mocha");
const server = require("../index");
const bcrypt = require("bcrypt");
const { response } = require("express");
const salt = bcrypt.genSaltSync(10);
chai.should();
chai.use(chaiHttp);

describe("Todo API", () => {
  const user1Credential = {
    email: "user1@gmail.com",
    password: "user1",
  };
  let tokenUser1;
  before((done) => {
    chai
      .request(server)
      .post("/user/login")
      .send(user1Credential)
      .end((err, response) => {
        tokenUser1 = response.body.access_token;
        done();
      });
  });

  // ========================================================================= //

  // Testing Registration

  // // Normal registration
  // describe("POST /user/register", () => {
  //   it("should do registration", (done) => {
  //     chai
  //       .request(server)
  //       .post("/user/register")
  //       .send({
  //         email: "user4@gmail.com",
  //         password: "user4",
  //       })
  //       .end((err, response) => {
  //         let hash = bcrypt.hashSync("user4", salt);
  //         response.should.have.status(201);
  //         response.body.should.be.a("object");
  //         response.body.should.have.property("email").eq("user4@gmail.com");
  //         response.body.should.have.property("password").to.include("$2");
  //         done();
  //       });
  //   });
  // });

  // Registration with already used email
  describe("POST /user/register wih already used email", () => {
    it("should not do registration", (done) => {
      chai
        .request(server)
        .post("/user/register")
        .send({
          email: "user1@gmail.com",
          password: "123",
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .to.be.an("array")
            .that.includes("Email is not unique");
          done();
        });
    });
  });

  // Registration without email
  describe("POST /user/register without emaild data provided", () => {
    it("should not do registration", (done) => {
      chai
        .request(server)
        .post("/user/register")
        .send({
          password: "123",
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .to.be.an("array")
            .that.includes("User.email cannot be null");
          done();
        });
    });
  });

  // Registration with empty email
  describe("POST /user/register with empty email", () => {
    it("should not do registration", (done) => {
      chai
        .request(server)
        .post("/user/register")
        .send({
          email: "",
          password: "123",
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .to.be.an("array")
            .that.includes(
              "Validation notEmpty on email failed",
              "Validation isEmail on email failed"
            );
          done();
        });
    });
  });

  // Registration with invalid email format
  describe("POST /user/register with invalid email format", () => {
    it("should not do registration", (done) => {
      chai
        .request(server)
        .post("/user/register")
        .send({
          email: "abc",
          password: "123",
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .to.be.an("array")
            .that.includes("Validation isEmail on email failed");
          done();
        });
    });
  });

  // Registration with empty password
  describe("POST /user/register with empty password", () => {
    it("should not do registration", (done) => {
      chai
        .request(server)
        .post("/user/register")
        .send({
          email: "user5@gmail.com",
          password: "",
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .to.be.an("array")
            .that.includes("Validation notEmpty on password failed");
          done();
        });
    });
  });

  // ========================================================================= //

  // Testing Authorized User

  // Get all todo
  describe("GET /todo", () => {
    it("should get all authorized todo", (done) => {
      chai
        .request(server)
        .get("/todo")
        .set("access_token", tokenUser1)
        .end((err, response) => {
          ids = response.body.map((res) => res.id);
          response.should.have.status(200);
          response.body.should.be.a("array");
          response.body.length.should.be.eq(2);
          ids.should.have.members([1, 2]);
          done();
        });
    });
  });

  // Get certain id todo
  describe("GET /todo/1", () => {
    it("should get all certain authorized todo", (done) => {
      chai
        .request(server)
        .get("/todo/1")
        .set("access_token", tokenUser1)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id").eq(1);
          done();
        });
    });
  });

  // Create todo
  describe("POST /todo", () => {
    it("should create new todo", (done) => {
      chai
        .request(server)
        .post("/todo")
        .set("access_token", tokenUser1)
        .send({
          title: "Watch SEA TI Qualifier",
          description: "Support BOOM!",
          status: "to execute",
          due_date: "2021-06-30 00:00:00",
        })
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a("object");
          response.body.should.have
            .property("title")
            .eq("Watch SEA TI Qualifier");
          response.body.should.have.property("description").eq("Support BOOM!");
          response.body.should.have.property("status").eq("to execute");
          response.body.should.have
            .property("due_date")
            .eq("2021-06-29T17:00:00.000Z");
          done();
        });
    });
  });

  // Create todo without title
  describe("POST /todo without title", () => {
    it("should not create new todo", (done) => {
      chai
        .request(server)
        .post("/todo")
        .set("access_token", tokenUser1)
        .send({
          description: "Support BOOM!",
          status: "to execute",
          due_date: "2021-06-30 00:00:00",
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have.property("error").to.be.a("array");
          done();
        });
    });
  });

  // Create todo with empty title
  // Create todo without description
  // Create todo with empty description
  // Create todo without status
  // Create todo with status not in ["to plan", "to code", "to execute", "done"]
  // Create todo without due date
  // Create todo with empty due date
  // Create todo with invalid date time string format due date
  // Patch todo
  // Patch todo with empty title
  // Path todo with empty description
  // Patch todo with status not in ["to plan", "to code", "to execute", "done"]
  // Patch todo with empty due date
  // Patch todo with invalid date time string format due date
  // Put todo
  // Put todo without title
  // Put todo with empty title
  // Put todo without description
  // Put todo with empty description
  // Put todo without status
  // Put todo with status not in ["to plan", "to code", "to execute", "done"]
  // Put todo without due date
  // Put todo with empty due date
  // Put todo with invalid date time string format due date
  // Delete todo

  // ========================================================================= //

  // Testing for unauthorized account

  // Get all todo for account which has 0 todo list

  // Get certain id todo for unauthorized account for the todo

  // Patch unauthorized todo

  // Put unauthorized todo

  // Delete unauthorized todo

  // ========================================================================= //

  // Testing for unauthenticated account

  // Get all todo without token

  // Get certain id todo without token

  // Create todo without token

  // Patch todo without token

  // Put todo without token

  // Delete todo without token
});
