const checkAdminKey = (req, res, next) => {
  const apiKey = req.headers['x-admin-key']?.trim();
  const secretKey = process.env.ADMIN_SECRET_KEY;

  // Debug Logging
  console.log(`[AdminAuth] Method: ${req.method}, Path: ${req.originalUrl}`);
  console.log(`[AdminAuth] Key Received: '${apiKey ? '***' + apiKey.slice(-3) : 'NONE'}'`);

  if (!secretKey) {
    console.error("[AdminAuth] CRITICAL: ADMIN_SECRET_KEY is missing in .env");
    return res.status(500).json({ message: "Server Configuration Error" });
  }

  if (apiKey && apiKey === secretKey) {
    next();
  } else {
    // Reveal if there is a length mismatch which implies whitespace or wrong key
    console.warn(`[AdminAuth] Failed. Received '${apiKey}' (Len: ${apiKey?.length}), Expected (Len: ${secretKey?.length})`);
    res.status(401).json({ message: "Not authorized. Invalid Admin Key." });
  }
};

module.exports = { checkAdminKey };
