import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import User from "./userModel";

interface driverStatusAttribute{
    id? : number;
    driverId : number;
    latitude : number;
    longitude : number;
    available : boolean;
}

class driverStatus extends Model <driverStatusAttribute>{
    public id? : number;
    public driverId! : number;
    public latitude! : number;
    public longitude! : number;
    public available! : boolean;
}

driverStatus.init ({
    id :{
        type : DataTypes.INTEGER,
        autoIncrement : true,
        allowNull : true,
        primaryKey : true
    },
    driverId :{
        type : DataTypes.INTEGER,
        allowNull : false,
        unique : true
    },
    latitude : {
        type : DataTypes.FLOAT,
        allowNull : false,
    },
    longitude :{
        type : DataTypes.INTEGER,
        allowNull : false
    }, 
    available : {
        type: DataTypes.BOOLEAN,
        allowNull : false,
    },
},
    {
        sequelize ,
        modelName : " DriverStatus",
        tableName : "driver_statuses"
    }
);

driverStatus.belongsTo(User , {
    foreignKey : "driverId", as: "Driver"
});

export default driverStatus;