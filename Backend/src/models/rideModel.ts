import { DataTypes , Model } from "sequelize";
import sequelize from "../config/database";
import User from "./userModel";

class Ride extends Model{
    public id? : number ;
    public driverId!  : number ;
    public passengerId! : number ;
    public pickUpLocation! : string ; 
    public dropUpLocation! : string ; 
    public status! : "pending" | "accepted" | "completed" | "Canceled";
}

Ride.init(
    {
        id :{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        driverId:{
            type: DataTypes.INTEGER,
            allowNull : true
        },
        passengerId : {
            type : DataTypes.INTEGER,
            allowNull : true
        },
        pickUpLocation :{
            type : DataTypes.STRING,
            allowNull : false
        },
        dropUpLocation: {
            type : DataTypes.STRING,
            allowNull : false
        },
        status :{
            type : DataTypes.ENUM('pending' , "accepted" , 'completed' , 'Canceled'),
            defaultValue : "pending",
        }, 
    },
    {
       sequelize,
       modelName : "Rides"
    }
);

Ride.belongsTo( User , {foreignKey :   'passengerId' , as: 'passenger' })
Ride.belongsTo( User ,{ foreignKey : "driverId", as : 'driver'})

export default Ride;