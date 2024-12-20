const jwt = require('jsonwebtoken');


// Middleware to check if the user is logged in
const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token;  // Get token from cookies
  
  if (!token) {
    // If token is not found, redirect to login page
    return res.redirect('/user/login');
  }

  try {
    // Verify the token using the JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to the request object for later use
    req.user = decoded;

    next();  // Allow access to the next middleware or route handler
  } catch (err) {
    console.error(err.message);
    return res.redirect('/user/login');  // Invalid token, redirect to login page
  }
};

module.exports = { isAuthenticated };
