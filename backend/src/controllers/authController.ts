import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { AuthRequest } from "../middleware/auth";

const signToken = (id: string) =>
  jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: "7d" });

const userPayload = (user: InstanceType<typeof User>) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  avatar: user.avatar,
});

// POST /api/auth/register
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: "Name, email and password are required" });
    }
    if (password.length < 8) {
      return res.status(400).json({ success: false, error: "Password must be at least 8 characters" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, error: "Email is already registered" });
    }

    const user = await User.create({ name, email, password, provider: "local" });
    const token = signToken(user._id.toString());

    res.status(201).json({ success: true, data: { token, user: userPayload(user) } });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Registration failed";
    res.status(500).json({ success: false, error: message });
  }
};

// POST /api/auth/login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: "Email and password are required" });
    }

    const user = await User.findOne({ email, provider: "local" }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, error: "Invalid email or password" });
    }

    const token = signToken(user._id.toString());
    res.json({ success: true, data: { token, user: userPayload(user) } });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Login failed";
    res.status(500).json({ success: false, error: message });
  }
};

// POST /api/auth/oauth  — sync OAuth user from NextAuth
export const oauthSync = async (req: Request, res: Response) => {
  try {
    const { name, email, avatar, provider, providerId } = req.body;
    if (!email || !provider) {
      return res.status(400).json({ success: false, error: "Email and provider are required" });
    }

    const user = await User.findOneAndUpdate(
      { email },
      { name, avatar, provider, providerId },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    const token = signToken(user._id.toString());
    res.json({ success: true, data: { token, user: userPayload(user) } });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "OAuth sync failed";
    res.status(500).json({ success: false, error: message });
  }
};

// GET /api/auth/me
export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, error: "User not found" });
    res.json({ success: true, data: userPayload(user) });
  } catch {
    res.status(500).json({ success: false, error: "Failed to fetch user" });
  }
};
