const jwt = require("jsonwebtoken");
const APP_SECRET = "GraphQL-is-aw3some";

const getTokenPayload = (token) => {
  return jwt.verify(token, APP_SECRET);
};

const getUserId = (req, authToken) => {
  if (req) {
    // Authorization Header
    const authHeader = req.headers.authorization;

    if (authHeader) {
      // extract token
      const token = authHeader.replace("Bearer ", "");

      // err if no token
      if (!token) {
        console.log("\n\n getUserid.js: NO TOKEN\n\n");
        throw new Error("No token found");
      }

      // verify userId
      const { userId } = getTokenPayload(token);

      return userId;
    }

    // verify authToken
    else if (authToken) {
      const { userId } = getTokenPayload(authToken);
      return userId;
    }
  }

  // if no token, throw error
  // stops resolvers
  console.log("\n\n getUserid.js: NO REQ\n\n");
  throw new Error("Not Authenticated!");
};

module.exports = {
  APP_SECRET,
  getUserId,
};
