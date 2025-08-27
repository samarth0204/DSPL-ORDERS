import "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        username: string;
        roles: string[];
        contactNumber: string;
      };
    }
  }
}
