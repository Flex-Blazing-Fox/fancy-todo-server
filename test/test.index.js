process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const { describe } = require("mocha");
const server = require("../index");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
chai.should();
chai.use(chaiHttp);

describe("Todo API", () => {
  // ========================================================================= //

  // Testing Registration

  // Normal registration
  describe("POST /user/register", () => {
    it("should do registration", (done) => {
      chai
        .request(server)
        .post("/user/register")
        .send({
          email: "user4@gmail.com",
          password: "user4",
        })
        .end((err, response) => {
          let hash = bcrypt.hashSync("user4", salt);
          response.should.have.status(201);
          response.body.should.be.a("object");
          response.body.should.have.property("email").eq("user4@gmail.com");
          response.body.should.have.property("password").to.include("$2");
          done();
        });
    });
  });

  // Registration with already used email
  describe("POST /user/register", () => {
    it("should not do registration because of already used email", (done) => {
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
  describe("POST /user/register", () => {
    it("should not do registration because email data is not provided", (done) => {
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
  describe("POST /user/register", () => {
    it("should not do registration because email data is empty", (done) => {
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
  describe("POST /user/register", () => {
    it("should not do registration because of invalid email format", (done) => {
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
  describe("POST /user/register", () => {
    it("should not do registration because of empty password", (done) => {
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

  // Get certain id todo

  // Create todo

  // Create todo without title

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
