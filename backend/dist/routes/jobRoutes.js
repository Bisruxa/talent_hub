import { Router } from "express";
import { validateBody } from "../middleware/validation.js";
import { createJobSchema } from "../middleware/db_validation.js";
import { createJob, deletJob, getJobs } from "../controllers/jobcontrollers.js";
import { authenticate } from "../middleware/auth.js";
const router = Router();
router.get('/jobs', authenticate, getJobs);
router.post('/jobs', authenticate, validateBody(createJobSchema), createJob);
router.delete("/jobs/:id", authenticate, deletJob);
export default router;
//# sourceMappingURL=jobRoutes.js.map