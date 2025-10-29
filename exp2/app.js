const express = require("express")
const app = express()
const authRoutes = require("./routes/authRoutes")
const blogRoutes = require("./routes/blogRoutes")


app.use(express.json())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/blogs", blogRoutes)


app.get("/", (req, res) => {
  res.json({ message: "Blog API is running!" })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

module.exports = app
