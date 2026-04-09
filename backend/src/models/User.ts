import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  avatar?: string;
  provider: "local" | "google" | "github" | "discord";
  providerId?: string;
  role: "admin" | "recruiter";
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, select: false },
    avatar: String,
    provider: { type: String, enum: ["local", "google", "github", "discord"], default: "local" },
    providerId: String,
    role: { type: String, enum: ["admin", "recruiter"], default: "recruiter" },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password || "");
};

export const User = mongoose.model<IUser>("User", userSchema);
