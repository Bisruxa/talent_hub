import {Router} from "express"
import { authenticate } from "../middleware/auth.js"
import { applyForJob, getMyApplications } from "../controllers/Applicationcontrollers.js"
const router = Router()
router.get('/applications',authenticate,getMyApplications)
router.post("/applications", authenticate ,applyForJob);
export default router