import { HotelRepository } from "../repository/Hotel.repository.js";

import Hotel from "../db/models/hotel.js";
import type { CreateHotelInput, TUpdateHotelInput } from "../dtos/hotel.dto.js";
const hotelRepository = new HotelRepository();
export class HotelService {
  /**
   * Create a new hotel
   */
  async createHotel(data: CreateHotelInput) {
    try {
      const hotel = await hotelRepository.create(data);
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

      const hotels = await hotelRepository.findAll();
      return hotels;
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
      const hotel = await hotelRepository.findById(id);
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
      const updateData = Object.fromEntries(
        Object.entries(data).filter(([, value]) => value !== undefined),
      ) as Partial<Hotel>;

      const hotel = await hotelRepository.update(id, updateData);

      return hotel.toJSON();
    } catch (error) {
      throw new Error(
        `Failed to update hotel: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      );
    }
  }

  /**
   * Delete hotel
   */
  async deleteHotel(id: number) {
    try {
      const hotel = await hotelRepository.softDelete(id);
      if (!hotel) {
        throw new Error("Hotel not found");
      }

      return { message: "Hotel deleted successfully", id };
    } catch (error) {
      throw new Error(
        `Failed to delete hotel: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }
}

export const hotelService = new HotelService();
