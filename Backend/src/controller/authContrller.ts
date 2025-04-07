
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/userModel";
import dotenv from "dotenv";
dotenv.config();

export const register =  async ( req:Request , res:Response) => {
   try{
      const {name , email, password , role} = req.body;
      const user = await  User.create({name , email , password , role});
      res.status(201).json({message : "User Registered Succesfully " , user});
   }catch(error){
     res.status(401).json({message : "Some error can accured" , error});
   }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return ;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password!);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid email or password" });
      return ;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role }, 
      process.env.JWT_SECET_KEY!,
      { expiresIn: "1h" }
    );


    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};