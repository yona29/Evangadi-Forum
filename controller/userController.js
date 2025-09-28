// controllers/userController.js

async function register(req, res) {
  const { username, firstname, lastname, email, password } = req.body;
  if (!username || !firstname || !lastname || !email || !password) {
    res
      .status(401)
      .json({ message: "please provide all required information!" });
  }
}

async function login(req, res) {
  res.json({ message: "login user" });
}

async function checkuser(req, res) {
  res.json({ message: "user route working" });
}
