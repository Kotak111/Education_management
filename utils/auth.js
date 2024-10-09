const jwt=require("jsonwebtoken");
const User = require("../models/user.model");

exports.auth = async (req, res, next) => {
    try {
      
      const token = req.cookies['education-auth'] || req.headers.authorization?.split(' ')[1];
    
      
  
      if (!token) {
        return res.status(401).json({ success: false, message: 'Authorization denied, no token provided' });
      }
  
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
     
      const user = await User.findById(decoded.userId);
  
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      
      req.user = user;
      next();
    } catch (error) {
      console.error("Authentication error:", error.message);
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
  };
  
  exports.IsAdmin = (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized, no user found" });
    }
  
    if (req.user.role === "admin") {
      next();
    } else {
      return res.status(403).json({ success: false, message: "You are not authorized as admin to access this resource" });
    }
  };
  
  exports.IsTeacher = (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized, no user found" });
    }
  
    if (req.user.role === "teacher") {
      next();
    } else {
      return res.status(403).json({ success: false, message: "You are not authorized as teacher to access this resource" });
    }
  };
  
  exports.IsStudent = (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized, no user found" });
    }
  
    if (req.user.role === "student") {
      next();
    } else {
      return res.status(403).json({ success: false, message: "You are not authorized as student to access this resource" });
    }
  };
  