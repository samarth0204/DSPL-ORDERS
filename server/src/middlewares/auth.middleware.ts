import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
  user?: any;
}

const JWT_SECRET = process.env.JWT_SECRET || "super-secret";

export const authenticateJWT = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "Authentication token missing" });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const authorizeRoles = (allowedRoles: String[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.roles) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const userRoles = req.user.roles;
      const hasRole = userRoles.some((role: string) =>
        allowedRoles.includes(role)
      );

      if (!hasRole) {
        return res
          .status(403)
          .json({ message: "Forbidden: insufficient role" });
      }

      next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
};
