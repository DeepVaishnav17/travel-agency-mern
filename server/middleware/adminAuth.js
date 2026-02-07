const checkAdminKey = (req, res, next) => {
  const apiKey = req.headers['x-admin-key'];
  const secretKey = process.env.ADMIN_SECRET_KEY;

  if (!secretKey) {
    console.error("ADMIN_SECRET_KEY is not defined in .env");
    return res.status(500).json({ message: "Server Configuration Error" });
  }

  if (apiKey && apiKey === secretKey) {
    next();
  } else {
    res.status(401).json({ message: "Not authorized. Invalid Admin Key." });
  }
};

module.exports = { checkAdminKey };
