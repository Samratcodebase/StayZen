import Hotel from "../db/models/hotel.js";
import type { CreateHotelInput, TUpdateHotelInput } from "../dtos/hotel.dto.js";

export class HotelService {
  /**
   * Create a new hotel
   */
  async createHotel(data: CreateHotelInput) {
    try {
      const hotel = await Hotel.create(data);
      return hotel.toJSON();
    } catch (error) {
      throw new Error(
        `Failed to create hotel: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  /**
   * Get all hotels
   */
  async getAllHotels(limit?: number, offset?: number) {
    try {
      const options = {} as any;
      if (limit) options.limit = limit;
      if (offset) options.offset = offset;

      const { count, rows } = await Hotel.findAndCountAll(options);
      return {
        total: count,
        data: rows.map((h) => h.toJSON()),
      };
    } catch (error) {
      throw new Error(
        `Failed to fetch hotels: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  /**
   * Get hotel by ID
   */
  async getHotelById(id: number) {
    try {
      const hotel = await Hotel.findByPk(id);
      if (!hotel) {
        throw new Error("Hotel not found");
      }
      return hotel.toJSON();
    } catch (error) {
      throw new Error(
        `Failed to fetch hotel: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  /**
   * Update hotel
   */
  async updateHotel(id: number, data: TUpdateHotelInput) {
    try {
      const hotel = await Hotel.findByPk(id);
      if (!hotel) {
        throw new Error("Hotel not found");
      }

      // Filter out undefined values to avoid Sequelize errors
      const updateData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== undefined),
      );

      await hotel.update(updateData);
      return hotel.toJSON();
    } catch (error) {
      throw new Error(
        `Failed to update hotel: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  /**
   * Delete hotel
   */
  async deleteHotel(id: number) {
    try {
      const hotel = await Hotel.findByPk(id);
      if (!hotel) {
        throw new Error("Hotel not found");
      }

      await hotel.destroy();
      return { message: "Hotel deleted successfully", id };
    } catch (error) {
      throw new Error(
        `Failed to delete hotel: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  /**
   * Search hotels by city
   */
  async searchHotelsByCity(city: string, limit?: number, offset?: number) {
    try {
      const options = {
        where: { city },
      } as any;

      if (limit) options.limit = limit;
      if (offset) options.offset = offset;

      const { count, rows } = await Hotel.findAndCountAll(options);
      return {
        total: count,
        data: rows.map((h) => h.toJSON()),
      };
    } catch (error) {
      throw new Error(
        `Failed to search hotels: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }
}

export const hotelService = new HotelService();
