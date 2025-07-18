const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes
const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (token && token.startsWith("Bearer ")) {
      token = token.split(" ")[1]; // extract the token string
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next(); // allow the request to move forward
    } else {
      return res
        .status(401)
        .json({ message: "Not authorized, token missing or invalid" });
    }
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return res
      .status(401)
      .json({ message: "Not authorized, token failed", error: error.message });
  }
};

//Middleware for Admin-only access
// Middleware for Admin-only access
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied: Admins only" });
  }
};

module.exports = { protect, adminOnly };
