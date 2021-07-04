const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
const getValidationErrorDetails = require("../helpers/getValidationErrorDetails");

class userController {
  static register(req, res, next) {
    const { email, password } = req.body;
    User.create({
      email,
      password,
    })
      .then((result) => res.status(201).json(result))
      .catch((err) => {
        if (err.name === "SequelizeValidationError") {
          next({
            name: "SEQUELIZE VALIDATION ERROR",
            details: getValidationErrorDetails(err),
          });
        } else {
          next({ name: "INTERNAL SERVER ERROR" });
        }
      });
  }
  static login(req, res, next) {
    const { email, password } = req.body;
    User.findOne({
      where: {
        email: email,
      },
    })
      .then((user) => {
        if (user && bcrypt.compareSync(password, user.dataValues.password)) {
          const payload = {
            id: user.dataValues.id,
          };
          const accessToken = jwt.sign(payload, process.env.JWT_SECRET);
          res.status(200).json({ access_token: accessToken });
        } else {
          throw { name: "EMAIL / PASSWORD AUTHENTICATION FAIL" };
        }
      })
      .catch((err) => next(err));
  }

  static loginGithub(req, res, next) {
    const { code } = req.body;
    let tokens = {},
      userEmail,
      userName;
    fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    })
      .then((result) => {
        return result.text();
      })
      .then((result) => {
        let params = new URLSearchParams(result);
        tokens.github_access_token = params.get("access_token");
        return fetch("https://api.github.com/user", {
          method: "GET",
          headers: {
            Accept: "application/vnd.github.v3+json",
            Authorization: `token ${tokens.github_access_token}`,
          },
        });
      })
      .then((result) => result.json())
      .then((result) => {
        userName = result.name;
        if (result.email) {
          userEmail = result.email;
          return User.findOne({
            where: {
              email: result.email,
            },
          });
        } else {
          throw { name: "EMAIL / PASSWORD AUTHENTICATION FAIL" };
        }
      })
      .then((result) => {
        if (!result) {
          User.create({
            email: userEmail,
            password: process.env.DEFAULT_PASSWORD,
          })
            .then(() => {
              return User.findOne({
                where: {
                  email: userEmail,
                },
              });
            })
            .then((result) => {
              const payload = {
                id: result.dataValues.id,
              };
              const accessToken = jwt.sign(payload, process.env.JWT_SECRET);
              res.status(200).json({
                access_token: accessToken,
                github_access_token: tokens.github_access_token,
                username: userName,
              });
            })
            .catch(() => {
              throw { name: "EMAIL / PASSWORD AUTHENTICATION FAIL" };
            });
        } else {
          const payload = {
            id: result.dataValues.id,
          };
          const accessToken = jwt.sign(payload, process.env.JWT_SECRET);
          res.status(200).json({
            access_token: accessToken,
            github_access_token: tokens.github_access_token,
            username: userName,
          });
        }
      })
      .catch((err) => next(err));
  }
}

module.exports = userController;
