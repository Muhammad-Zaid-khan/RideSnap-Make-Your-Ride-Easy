import sequelize from "../config/database";
import driverStatus from "../models/driverStatus";


const connectDB = async () => {
   try {
     await sequelize.authenticate()
     await sequelize.sync( {alter : true} )
     console.log(" Database are connected sucessfully");
   }catch (err){
    console.log("There are some error on database " , err);
   }
}

export default connectDB;


driverStatus.sync({ force: false })  
    .then(() => console.log('Driver Status Table Created or Synced'));
