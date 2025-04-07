import express, { Request, Response } from "express";
import { login , register } from "../controller/authContrller";
import passport from "../middleware/authMiddleware";


const router = express.Router();

router.post("/register" , register);
router.post("/login" ,  passport.authenticate('local') as any , login);

export default router;

