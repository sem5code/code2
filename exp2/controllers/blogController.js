const blogs = [] // In-memory blog list
let id = 1

exports.createBlog = (req, res) => {
  const { title, content } = req.body
  const blog = { id: id++, title, content, author: req.user.username }
  blogs.push(blog)
  res.status(201).json(blog)
}

exports.getAllBlogs = (req, res) => {
  res.json(blogs)
}

exports.getBlogById = (req, res) => {
  const blog = blogs.find((b) => b.id == req.params.id)
  if (!blog) return res.status(404).json({ error: "Blog not found" })
  res.json(blog)
}

exports.updateBlog = (req, res) => {
  const blog = blogs.find((b) => b.id == req.params.id)
  if (!blog) return res.status(404).json({ error: "Blog not found" })

  if (blog.author !== req.user.username) return res.status(403).json({ error: "Unauthorized" })

  blog.title = req.body.title || blog.title
  blog.content = req.body.content || blog.content
  res.json(blog)
}

exports.deleteBlog = (req, res) => {
  const blogIndex = blogs.findIndex((b) => b.id == req.params.id)
  if (blogIndex === -1) return res.status(404).json({ error: "Blog not found" })

  if (blogs[blogIndex].author !== req.user.username) return res.status(403).json({ error: "Unauthorized" })

  blogs.splice(blogIndex, 1)
  res.json({ message: "Blog deleted" })
}
