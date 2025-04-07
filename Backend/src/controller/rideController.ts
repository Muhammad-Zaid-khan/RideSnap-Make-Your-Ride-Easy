import { Request, Response } from "express";
import Ride from "../models/rideModel";
import driverStatus from "../models/driverStatus";
import { Op } from "sequelize";

export const requestRide =  async ( req:Request , res:Response) => {
    try {
        const { passengerId, pickUpLocation, dropUpLocation, latitude, longitude } = req.body;
        const ride = await Ride.create({passengerId , pickUpLocation , dropUpLocation });
    const nearDriver = await driverStatus.findOne( {  where : {
        available : true, 
        latitude:{[Op.between] : [latitude - 0.05 , latitude + 0.05]},
        longitude:{[Op.between] : [longitude - 0.05 , longitude + 0.05]}
    }});
    if(!nearDriver){
       res.status(401).json({message : "No Driver are Available Near by You!....."})
       return
    }else{
        ride.driverId = nearDriver.driverId;
        ride.status = 'accepted';
        await ride.save;

        res.json( {message : "Driver are Matched"});
        return
    } 
    } catch(error){
        res.status(500).json({message : 'Error Accoure in requesting', error } );
    } 
 };
