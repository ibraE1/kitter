import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  const cookie = req.headers.cookie;
  if (!cookie) return res.status(400).json("Not authorized");

  const token = cookie.slice(12);
  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) return res.status(400).json("Invalid token");
      else {
        req.userid = decodedToken.id;
        return next();
      }
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default verifyToken;
