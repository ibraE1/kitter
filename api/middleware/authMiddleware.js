import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  const cookie = req.headers.cookie;
  if (!cookie) return res.json("Not authorized");

  const token = cookie.slice(12);
  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) return res.json("Invalid token");
      else {
        req.body.id = decodedToken.id;
        return next();
      }
    });
  } catch (error) {
    res.json(error);
  }
};

export default verifyToken;
