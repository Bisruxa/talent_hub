import {Router} from "express"
import { authenticate } from "../middleware/auth.ts"
import { applyForJob, getMyApplications } from "../controllers/Applicationcontrollers.ts"
const router = Router()
router.get('/applications',authenticate,getMyApplications)
router.post("/applications", authenticate ,applyForJob);
export default router