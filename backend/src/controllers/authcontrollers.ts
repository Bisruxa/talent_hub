import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.ts";
import prisma from "../db.ts"; 

export const register = async (req: Request, res: Response) => {
  try {
    const { email,name, password,role} = req.body;
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "12");
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await prisma.users.create({
      data: {
        email,
        name: name, 
        password: hashedPassword, 
        role: role, 
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        role:true,
      },
    });
    const token = await generateToken({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
     role:newUser.role
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
export const login=async(req:Request,res:Response)=>{
  try{
   

const {email,password}=req.body
 if (!email || !password) {
   return res.status(400).json({ error: "Email and password are required" });
 }
const user = await prisma.users.findFirst({
  where:{
    email
  }
 
})
 if(!user){
    return res.status(401).json({error:'Invalid credentials'})
  }
  const isValidPassword = await bcrypt.compare(password,user.password)
  if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    const token = await generateToken({
      id: user.id,
      email: user.email,
      name:user.name,
      role:user.role,
    })
 res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role:user.role
       
      },
      token,
    })
  }catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Failed to login' })}
}
