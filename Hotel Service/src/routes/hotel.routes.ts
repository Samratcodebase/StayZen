import { Router } from "express";
import { hotelController } from "../controllers/hotel.controller.js";

const router = Router();

// CRUD Routes
router.post("/", (req, res) => hotelController.createHotel(req, res));
router.get("/", (req, res) => hotelController.getAllHotels(req, res));
router.get("/search", (req, res) => hotelController.searchByCity(req, res));
router.get("/:id", (req, res) => hotelController.getHotelById(req, res));
router.put("/:id", (req, res) => hotelController.updateHotel(req, res));
router.delete("/:id", (req, res) => hotelController.deleteHotel(req, res));

export default router;
