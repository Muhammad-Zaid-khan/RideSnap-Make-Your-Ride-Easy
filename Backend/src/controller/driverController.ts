import { Request , Response } from "express";
import driverStatus from "../models/driverStatus";

export const updateDriverStatus = async (req : Request , res : Response) => {
   try {
    const {driverId , latitude , longitude , available} = req.body
    const DriverStatus = await  driverStatus.findOne( {where: { driverId }})
    if (DriverStatus) {
        DriverStatus.latitude = latitude;
        DriverStatus.longitude = longitude;
        DriverStatus.available = available
        DriverStatus.save()
    }else{
        await driverStatus.create({ driverId , latitude , longitude , available});
    }res.json({message : 'Driver Status are updated'});
    return;
}catch (error){
//    res.send(error);
   res.status(500).json({message : 'Error Updating Status' , error});
   return;
}};

