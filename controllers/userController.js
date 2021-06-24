const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class userController {
  static register(req, res) {
    const { email, password } = req.body;
    User.create({
      email,
      password,
    })
      .then((result) => res.status(201).json(result))
      .catch((err) => res.status(500).json(err));
  }
  static login(req, res) {
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
          const accessToken = jwt.sign(payload, "ABCD");
          res.status(200).json({ access_token: accessToken });
        } else {
          res.status(401).json({ message: "email atau password salah" });
        }
      })
      .catch((err) => res.status(500).json(err));
  }
}

module.exports = userController;
