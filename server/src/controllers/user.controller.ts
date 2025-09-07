import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import prisma from "../config/prisma";
import bcrypt from "bcrypt";
import { CookieOptions } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "akash-secret";
const REFRESH_SECRET = process.env.REFRES_SECRET || "akash-secret";
const allowedRoles = ["ADMIN", "SALESMAN", "FULFILLMENT"];

type MinimalUser = {
  id: string;
  username: string;
  contactNumber: string;
  roles: any;
};

type GroupedUsers = {
  admin: MinimalUser[];
  salesman: MinimalUser[];
  fulfillment: MinimalUser[];
};

const cookieOptions: CookieOptions = {
  maxAge: 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "none",
  secure: process.env.NODE_ENV === "production",
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password required" });
    }
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      {
        username: user.username,
        roles: user.roles,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign({ id: user.id }, REFRESH_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        roles: user.roles,
        contactNumber: user.contactNumber,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res.status(401).json({ message: "No refresh token" });
    }

    // Verify refresh token
    const decoded: any = jwt.verify(token, REFRESH_SECRET);

    // Check if refresh token is valid in DB
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Create new access token
    const newAccessToken = jwt.sign(
      {
        id: user.id,
        username: user.username,
        roles: user.roles,
      },
      JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.cookie("accessToken", newAccessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000,
    });

    return res.json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        roles: user.roles,
      },
    });
  } catch (err) {
    console.error(err);
    return res
      .status(403)
      .json({ message: "Invalid or expired refresh token" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password, roles, contactNumber } = req.body;
    if (!username || !password || !roles || roles.length === 0) {
      return res
        .status(400)
        .json({ message: "username, password and roles are required" });
    }

    if (roles.some((role: string) => !allowedRoles.includes(role))) {
      return res.status(400).json({ message: "Not valid role" });
    }
    //check if username already exists
    const normalizedUsername = username.trim().toLowerCase();
    const existingUser = await prisma.user.findUnique({
      where: { username: normalizedUsername },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username: normalizedUsername,
        password: hashedPassword,
        roles,
        contactNumber,
      },
      select: {
        id: true,
        username: true,
        roles: true,
        contactNumber: true,
      },
    });
    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        roles: true,
        contactNumber: true,
      },
    });

    const groupedUsers = users.reduce((acc: any, user: any) => {
      user.roles.forEach((role: any) => {
        const key = role.toLowerCase() as keyof GroupedUsers;
        if (!acc[key]) acc[key] = [] as any;
        acc[key]!.push(user);
      });
      return acc;
    }, {} as GroupedUsers);

    return res.status(200).json(groupedUsers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "User id is required" });
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        roles: true,
        createdAt: true,
        contactNumber: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, password, roles, contactNumber } = req.body;

    if (!id) {
      return res.status(400).json({ message: "User id is required" });
    }
    if (!username || !password || !roles || roles.length === 0) {
      return res
        .status(400)
        .json({ message: "username, password and roles are required" });
    }
    if (roles.some((role: string) => !allowedRoles.includes(role))) {
      return res.status(400).json({ message: "Not valid role" });
    }

    const userExists = await prisma.user.findUnique({ where: { id } });
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        username,
        password: hashedPassword,
        roles,
        contactNumber,
      },
      select: {
        id: true,
        username: true,
        roles: true,
        contactNumber: true,
        updatedAt: true,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "User id is required" });
    }
    const currentUserId = req.user?.id; // assuming you attach user info from JWT in middleware

    if (id === currentUserId) {
      return res
        .status(400)
        .json({ message: "You cannot delete your own account." });
    }

    const userExists = await prisma.user.findUnique({ where: { id } });
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    const deletedUser = await prisma.user.delete({
      where: { id },
      select: {
        id: true,
        username: true,
        roles: true,
        contactNumber: true,
      },
    });

    return res.status(200).json({ message: "User deleted", user: deletedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "User id is required" });
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        roles: true,
        contactNumber: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res.clearCookie("accessToken", { ...cookieOptions, path: "/" });
    res.clearCookie("refreshToken", { ...cookieOptions, path: "/" });
    return res.status(200).json({ message: "user Successfully logged out" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Setver error" });
  }
};
