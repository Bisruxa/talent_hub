import type { Request,Response } from "express";
import bcrypt from 'bcrypt'

export const register =(req:Request,res:Response)=>{
  try{

  }catch(e){
    console.error("Registration error",e)
    res.status(500).json({
      error:'Failed to create user'
    })
  }
}