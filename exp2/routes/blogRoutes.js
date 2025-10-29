const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const blogController = require("../controllers/blogController")

router.get("/", blogController.getAllBlogs)
router.get("/:id", blogController.getBlogById)
router.post("/", auth, blogController.createBlog)
router.put("/:id", auth, blogController.updateBlog)
router.delete("/:id", auth, blogController.deleteBlog)

module.exports = router
