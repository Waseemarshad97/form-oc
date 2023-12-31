const User = require("../models/users");

exports.register = async (req, res, next) => {
  const { email, password } = req.body;
  console.log("hit");

  // validate email & password - later validation can be moved to middleware
  if (!email || !password) {
    return res.status(500).json({
      error: "Email and password are required",
    });
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(420).json({
        error: "User Exists!",
      });
    }

    const newUser = new User({
      email: email,
      password: password,
    });

    const resp = await newUser.save();
    return res.status(200).json({
      message: "User Created successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: `${error.message}`,
    });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log("hit");

  // validate email & password - later validation can be moved to middleware
  if (!email || !password) {
    return res.status(500).json({
      error: "Email and password are required",
    });
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(200).json({
        data: user,
      });
    } else {
      return res.status(420).json({
        error: "user doesnt exist",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: `${error.message}`,
    });
  }
};

exports.listUsers = async (req, res, next) => {
  try {
    // Retrieve all users
    const users = await User.find();

    if (users.length > 0) {
      return res.status(200).json({
        data: users,
      });
    } else {
      return res.status(404).json({
        error: "No users found",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
