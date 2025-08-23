import { Router } from "express";
import { login, register } from "../controllers/authcontrollers.ts";
import { validateBody } from "../middleware/validation.ts";
import { z } from "zod";
import { createUserSchema, loginSchema } from "../middleware/db_validation.ts";
const router = Router();
router.post("/register", validateBody(createUserSchema), register);
router.post("/login", validateBody(loginSchema), login);
export default router;
//# sourceMappingURL=authRoutes.js.map