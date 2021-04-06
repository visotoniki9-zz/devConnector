const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Get token from the header
  const token = req.header('x-auth-token');
  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token found, authorization denid' });
  }
  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};
