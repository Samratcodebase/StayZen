import { Model, DataTypes } from "sequelize";
import type {

  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import sequelize from "./sequelize.config.js";
class Hotel extends Model<
  InferAttributes<Hotel>,
  InferCreationAttributes<Hotel>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: CreationOptional<string | null>;
  declare address_line1: string;
  declare address_line2: CreationOptional<string | null>;
  declare city: string;
  declare state: CreationOptional<string | null>;
  declare country: string;
  declare zip_code: CreationOptional<string | null>;
  declare latitude: CreationOptional<string | null>;
  declare longitude: CreationOptional<string | null>;
  declare phone: CreationOptional<string | null>;
  declare email: CreationOptional<string | null>;
  declare rating: CreationOptional<number | null>;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

Hotel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    address_line1: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    address_line2: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    zip_code: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true,
    },
    longitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    rating: {
      type: DataTypes.DECIMAL(2, 1),
      allowNull: true,
      validate: {
        min: 0,
        max: 5,
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: sequelize,
    tableName: "Hotels",
    timestamps: false,
  },
);

export default Hotel;
