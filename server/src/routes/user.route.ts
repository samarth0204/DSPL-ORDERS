import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getCurrentUser,
  getUserById,
  login,
  logout,
  refresh,
  updateUser,
} from "../controllers/user.controller";
import {
  authenticateJWT,
  authorizeRoles,
} from "../middlewares/auth.middleware";

const router = Router();

// public
router.post("/login", login);
router.post("/logout", logout);
router.post("/auth/refresh", refresh);

// protected (ADMIN only)
router.post("/", authenticateJWT, authorizeRoles(["ADMIN"]), createUser);
router.get("/", authenticateJWT, authorizeRoles(["ADMIN"]), getAllUsers);
router.get("/:id", authenticateJWT, authorizeRoles(["ADMIN"]), getUserById);
router.put("/:id", authenticateJWT, authorizeRoles(["ADMIN"]), updateUser);
router.delete("/:id", authenticateJWT, authorizeRoles(["ADMIN"]), deleteUser);

// optional (any logged-in user)
router.get("/me", authenticateJWT, getCurrentUser);

export default router;
