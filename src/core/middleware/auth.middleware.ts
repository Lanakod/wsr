import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;
  if (!token || token.split(" ").length !== 2)
    return res.status(401).json({
      message: "Unauthorized",
    });

  try {
    token = token.split(" ")[1];

    if (token === "null" || !token)
      return res.status(401).send("Unauthorized request");

    let verifiedUser = jwt.verify(token, process.env.TOKEN_SECRET as string);
    if (!verifiedUser)
      return res.status(401).json({
        message: "Unauthorized",
      });

    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
};