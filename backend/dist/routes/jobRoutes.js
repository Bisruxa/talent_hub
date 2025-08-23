import { Router } from "express";
import { validateBody } from "../middleware/validation.ts";
import { z } from 'zod';
import { createJobSchema } from "../middleware/db_validation.ts";
import { createJob, deletJob, getJobs } from "../controllers/jobcontrollers.ts";
import { authenticate } from "../middleware/auth.ts";
const router = Router();
router.get('/jobs', authenticate, getJobs);
router.post('/jobs', authenticate, validateBody(createJobSchema), createJob);
router.delete("/jobs/:id", authenticate, deletJob);
export default router;
//# sourceMappingURL=jobRoutes.js.map