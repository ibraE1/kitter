import express from "express";
import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) return res.json("Not authorized");

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
