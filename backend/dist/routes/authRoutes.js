import { Router } from "express";
import { login, register } from "../controllers/authcontrollers.js";
import { validateBody } from "../middleware/validation.js";
import { createUserSchema, loginSchema } from "../middleware/db_validation.js";
const router = Router();
router.post("/register", validateBody(createUserSchema), register);
router.post("/login", validateBody(loginSchema), login);
export default router;
//# sourceMappingURL=authRoutes.js.map