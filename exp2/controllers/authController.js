const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// In-memory user store
const users = []
let nextUserId = 1

exports.register = async (req, res) => {
  const { username, email, password } = req.body

  // Check if user already exists
  const existingUser = users.find((u) => u.email === email)
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" })
  }

  const hashedPwd = await bcrypt.hash(password, 10)
  const newUser = {
    id: nextUserId++,
    username,
    email,
    password: hashedPwd,
  }
  users.push(newUser)

  res.json({
    message: "User registered successfully",
    user: { id: newUser.id, username: newUser.username, email: newUser.email },
  })
}

exports.login = async (req, res) => {
  const { email, password } = req.body
  const user = users.find((u) => u.email === email)
  if (!user) return res.status(400).json({ error: "User not found" })

  const validPwd = await bcrypt.compare(password, user.password)
  if (!validPwd) return res.status(400).json({ error: "Invalid password" })

  const token = jwt.sign({ userId: user.id, email: user.email }, "SECRET_KEY", { expiresIn: "1h" })
  res.json({
    message: "Login successful",
    token,
    user: { id: user.id, username: user.username, email: user.email },
  })
}
