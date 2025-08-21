import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.ts";
import prisma from "../db.ts"; 

export const register = async (req: Request, res: Response) => {
  try {
    const { email,name, password} = req.body;

    // Hash password with configurable rounds
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "12");
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user in database
    const newUser = await prisma.users.create({
      data: {
        email,
        name: name, 
        password: hashedPassword, 
        role: "applicant", 
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    // Generate JWT for auto-login
    const token = await generateToken({
      id: newUser.id,
      email: newUser.email,
      username: newUser.name,
    });

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
};
