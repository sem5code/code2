
const fetch = require("node-fetch")

const BASE_URL = "http://localhost:3000/api"

async function testAPI() {
  try {
    console.log("🧪 Testing Blog API...\n")
    console.log("1. Testing user registration...")
    const registerResponse = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "testuser", password: "testpass" }),
    })
    const registerResult = await registerResponse.json()
    console.log("✅ Registration:", registerResult)

    // Test login
    console.log("\n2. Testing user login...")
    const loginResponse = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "testuser", password: "testpass" }),
    })
    const loginResult = await loginResponse.json()
    console.log("✅ Login:", loginResult)

    const token = loginResult.token

    // Test creating blog
    console.log("\n3. Testing blog creation...")
    const createResponse = await fetch(`${BASE_URL}/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: "Test Blog",
        content: "This is a test blog post!",
      }),
    })
    const createResult = await createResponse.json()
    console.log("✅ Blog created:", createResult)

    // Test getting all blogs
    console.log("\n4. Testing get all blogs...")
    const getAllResponse = await fetch(`${BASE_URL}/blogs`)
    const getAllResult = await getAllResponse.json()
    console.log("✅ All blogs:", getAllResult)

    console.log("\n🎉 All tests passed!")
  } catch (error) {
    console.error("❌ Test failed:", error.message)
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  testAPI()
}

module.exports = testAPI
