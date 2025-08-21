import { Router } from "express";
import { register } from "../controllers/authcontrollers.ts";
import { validateBody } from "../middleware/validation.ts";
import { z } from "zod";
import { createUserSchema } from "../middleware/db_validation.ts";
const router = Router();

router.post("/register", validateBody(createUserSchema), register);

export default router;
