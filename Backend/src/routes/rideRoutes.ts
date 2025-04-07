// import express from 'express';
// import { requestRide } from '../controller/rideController';

// const router = express.Router();

// router.post("/request" , requestRide );

// export default router;

import express, { NextFunction, Request, Response } from "express";
import Ride from "../models/rideModel";
import driverStatus from "../models/driverStatus";

const router = express.Router();

// Rider requests a ride
router.post("/request", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { passengerId, pickUpLocation, dropUpLocation } = req.body;

    // Find an available driver
    const availableDriver = await driverStatus.findOne({ where: { available: true } });

    if (!availableDriver) {
      res.status(400).json({ message: "No available drivers" });
      return;
    }

    const newRide = await Ride.create({
      passengerId,
      driverId: availableDriver.driverId,
      pickUpLocation,
      dropUpLocation,
      status: "pending",
    });

    res.status(201).json({ message: "Ride requested", ride: newRide });
  } catch (error) {
    next(error);
  }
});

// Driver accepts or rejects ride
router.post("/:rideId/respond", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { rideId } = req.params;
    const { driverId, action } = req.body;

    const ride = await Ride.findByPk(rideId);
    if (!ride) {
      res.status(404).json({ message: "Ride not found" });
      return;
    }

    if (ride.status !== "pending") {
      res.status(400).json({ message: "Ride already responded to" });
      return;
    }

    if (action === "accept") {
      ride.status = "accepted";
    } else if (action === "reject") {
      ride.status = "Canceled"; // Fix capitalization
    } else {
      res.status(400).json({ message: "Invalid action" });
      return;
    }

    await ride.save();
    res.json({ message: `Ride ${ride.status}`, ride });
  } catch (error) {
    next(error);
  }
});

// Ride completion
router.post("/:rideId/complete", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { rideId } = req.params;

    const ride = await Ride.findByPk(rideId);
    if (!ride) {
      res.status(404).json({ message: "Ride not found" });
      return;
    }

    ride.status = "completed";
    await ride.save();

    res.json({ message: "Ride completed", ride });
  } catch (error) {
    next(error);
  }
});

export default router;
