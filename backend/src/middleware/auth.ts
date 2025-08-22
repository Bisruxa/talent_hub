import type{Request,Response,NextFunction} from "express"
import {jwtVerify} from "jose"
import env from '../../env.ts'
export interface AuthRequest extends Request{
  user?:{id:string;
    email:string;
    name:string
  };
}
export const authenticate = async(req:Request,res:Response,next:NextFunction)=>{
  try{
    const authHeader = req.headers.authorization
    if(!authHeader) return res.status(401).json({error:"Authorzation header missing"})
    const token = authHeader.split(" ")[1];
  const {payload} = await jwtVerify(token,new TextEncoder().encode(env.JWT_SECRET))
  req.user={
    id:(payload as any).id,
    email:(payload as any).email,
    name:(payload as any).name
  };
  next();
  }
  catch(err){
    console.error(err);
    return res.status(401).json({error:"Invalid Token"})
  }
  
}