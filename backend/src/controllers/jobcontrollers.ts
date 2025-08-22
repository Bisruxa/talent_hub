import type{ Response } from "express";
import prisma from "../db.ts"
import type{ AuthRequest } from "../middleware/auth.ts";

export const createJob=async(req:AuthRequest,res:Response)=>{
  try{
    const {title,description}= req.body;
    const job = await prisma.jobs.create({
      data:{
        title,
        description,
        createBy:req.user!.id,
      },
    });
    res.status(201).json({job});
  }catch(err){
    console.error(err);
    res.status(500).json({error:"Failed to create job"})
  }
}
export const getJobs = async(req:AuthRequest,res:Response)=>{
  try {
    const userId = req.user!.id;
    const jobs = await prisma.jobs.findMany({
      include: {
        Applications: true,
        createByUser: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const jobsWithUserStatus = jobs.map((job) => {
      const appliedByUser = job.Applications.some(
        (app) => app.userId === userId
      );
      return {
        ...job,
        appliedByUser,
      };
    });

    res.json({ jobs: jobsWithUserStatus });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
}