import { Router } from "express";
import { validateBody } from "../middleware/validation.ts";
import {z} from 'zod'
import { createJobSchema } from "../middleware/db_validation.ts";
import {createJob, getJobs} from "../controllers/jobcontrollers.ts";
import { authenticate } from "../middleware/auth.ts";
const router = Router()
router.get('/jobs',authenticate,getJobs)
router.post('/jobs',authenticate, validateBody(createJobSchema),createJob)
export default router