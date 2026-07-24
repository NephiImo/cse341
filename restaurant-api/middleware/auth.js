const requireAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.status(401).json({
    message: "Authentication required. Please log in with Google."
  });
};

module.exports = {
  requireAuth
};