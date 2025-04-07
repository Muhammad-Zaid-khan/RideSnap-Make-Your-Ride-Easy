import { INTEGER } from "sequelize";
import sequelize from "../config/database";
import { DataTypes, Model } from "sequelize";
import bcrypt from 'bcrypt';
import Ride from "./rideModel";
import driverStatus from "./driverStatus";


class User extends Model {
  public id?: string;
  public name?: string;
  public email?: string;
  public password?: string;
  public confirm_password?: string;
  public role?: "driver" | "rider";
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    confirm_password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM('rider', 'driver'),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);
User.beforeCreate(async (user: User): Promise<void> => {

  const salt = await bcrypt.genSalt(10);
  user.password = user.password ? await bcrypt.hash(user.password, salt) : undefined;
});




export default User;