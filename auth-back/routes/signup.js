const express = require("express");
const User = require("../schema/user");
const { jsonResponse } = require("../lib/jsonResponse");
const router = express.Router();

router.post("/", async function (req, res, next) {
  const { username, password, name, email, avatarURL } = req.body;

  if (!username || !password || !name || !email) {
    return res.status(409).json(
      jsonResponse(409, {
        error: "username, password, name, and email are required",
      })
    );
  }

  try {
    const user = new User();
    const userExists = await user.usernameExists(username);

    if (userExists) {
      return res.status(409).json(
        jsonResponse(409, {
          error: "username already exists",
        })
      );
    } else {
      const newUser = new User({ username, password, name, email, avatarURL });
      console.log("New User with avatarURL:", newUser);
      newUser.save();

      res.json(
        jsonResponse(200, {
          message: "User created successfully",
        })
      );
    }
  } catch (err) {
    return res.status(500).json(
      jsonResponse(500, {
        error: "Error creating user",
      })
    );
  }
});

module.exports = router;
