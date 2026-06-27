import { Model, DataTypes } from "sequelize";
import type {
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../sequelize.config.js";

class roomCategory extends Model<
  InferAttributes<roomCategory>,
  InferCreationAttributes<roomCategory>
> {
  declare Room_Category_id: CreationOptional<number>;
  declare Room_Type: string;
  declare Room_Price: number;
  declare Hotel_id: bigint;
}

roomCategory.init(
  {
    Room_Category_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Room_Type: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    Room_Price: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Hotel_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    tableName: "room_category",
    timestamps: false,
  },
);
