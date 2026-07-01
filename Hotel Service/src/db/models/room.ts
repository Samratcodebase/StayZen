import { Model, DataTypes } from "sequelize";
import type {
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../sequelize.config.js";
class Rooms extends Model<
  InferAttributes<Rooms>,
  InferCreationAttributes<Rooms>
> {
  declare room_id: CreationOptional<number>;

  declare hotel_id: bigint;
  declare room_category_id: number;
  declare room_no: string;
  declare date_of_avalibilty: Date;
  declare booking_id: number;
}

Rooms.init(
  {
    room_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    hotel_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    room_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    room_no: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },

    date_of_avalibilty: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    booking_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize: sequelize,
    tableName: "rooms",
    timestamps: false,
  },
);
