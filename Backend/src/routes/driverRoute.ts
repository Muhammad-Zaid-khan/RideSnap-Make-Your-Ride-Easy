import express from 'express';
import { updateDriverStatus } from '../controller/driverController';

const router = express.Router();

router.post('/status' , updateDriverStatus);

export default router;

// import express, { NextFunction, Request, Response } from "express";
// import driverStatus from "../models/driverStatus";

// const router = express.Router();

// router.post("/status", async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { driverId, latitude, longitude } = req.body;

//     const driverStatusRecord = await driverStatus.findOne({ where: { driverId } });

//     if (!driverStatusRecord) {
//       console.warn(`Driver with ID ${driverId} not found.`);
//       return res.status(404).json({ message: "Driver not found" });
//     }

//     driverStatusRecord.latitude = latitude;
//     driverStatusRecord.longitude = longitude;
//     await driverStatusRecord.save();

//     return res.json({ message: "Location updated", driverStatus: driverStatusRecord });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// export default router;

