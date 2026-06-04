import type { Request, Response } from "express";
import { hotelService } from "../services/hotel.service.js";
import { CreateHotelDTO, UpdateHotelDTO } from "../dtos/hotel.dto.js";

import type { TUpdateHotelInput } from "../dtos/hotel.dto.js";
export class HotelController {
  /**
   * Create a new hotel
   * POST /api/hotels
   */
  async createHotel(req: Request, res: Response) {
    try {
      const validatedData = CreateHotelDTO.parse(req.body);
      const hotel = await hotelService.createHotel(validatedData);

      res.status(201).json({
        success: true,
        message: "Hotel created successfully",
        data: hotel,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
    }
  }

  /**
   * Get all hotels
   * GET /api/hotels
   */
  async getAllHotels(req: Request, res: Response) {
    try {
      const limit = req.query.limit
        ? parseInt(req.query.limit as string)
        : undefined;
      const offset = req.query.offset
        ? parseInt(req.query.offset as string)
        : undefined;

      const result = await hotelService.getAllHotels(limit, offset);

      res.status(200).json({
        success: true,
        message: "Hotels fetched successfully",
        data: result.data,
        pagination: {
          total: result.total,
          limit: limit || null,
          offset: offset || null,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Internal server error",
      });
    }
  }

  /**
   * Get hotel by ID
   * GET /api/hotels/:id
   */
  async getHotelById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const hotel = await hotelService.getHotelById(parseInt(id as string));

      res.status(200).json({
        success: true,
        message: "Hotel fetched successfully",
        data: hotel,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error instanceof Error ? error.message : "Hotel not found",
      });
    }
  }

  /**
   * Update hotel
   * PUT /api/hotels/:id
   */
  async updateHotel(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const validatedData = UpdateHotelDTO.parse(req.body) as TUpdateHotelInput;
      const hotel = await hotelService.updateHotel(
        parseInt(id as string),
        validatedData,
      );

      res.status(200).json({
        success: true,
        message: "Hotel updated successfully",
        data: hotel,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Internal server error";
      const statusCode = errorMessage.includes("not found") ? 404 : 400;

      res.status(statusCode).json({
        success: false,
        message: errorMessage,
      });
    }
  }

  /**
   * Delete hotel
   * DELETE /api/hotels/:id
   */
  async deleteHotel(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await hotelService.deleteHotel(parseInt(id as string));

      res.status(200).json({
        success: true,
        message: result.message,
        data: { id: result.id },
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error instanceof Error ? error.message : "Hotel not found",
      });
    }
  }

  /**
   * Search hotels by city
   * GET /api/hotels/search?city=cityName
   */
  async searchByCity(req: Request, res: Response) {
    try {
      const city = req.query.city;

      if (typeof city !== "string") {
        res.status(400).json({
          success: false,
          message: "City parameter is required",
        });
        return;
      }

      const limit = req.query.limit
        ? parseInt(req.query.limit as string)
        : undefined;
      const offset = req.query.offset
        ? parseInt(req.query.offset as string)
        : undefined;

      const result = await hotelService.searchHotelsByCity(city, limit, offset);

      res.status(200).json({
        success: true,
        message: "Hotels found",
        data: result.data,
        pagination: {
          total: result.total,
          limit: limit || null,
          offset: offset || null,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Internal server error",
      });
    }
  }
}

export const hotelController = new HotelController();
