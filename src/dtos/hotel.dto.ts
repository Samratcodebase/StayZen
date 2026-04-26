import { z } from "zod";

// Create Hotel DTO
export const CreateHotelDTO = z.object({
  name: z.string().min(1, "Hotel name is required").max(255),
  description: z.string().optional().nullable(),
  address_line1: z.string().min(1, "Address line 1 is required").max(255),
  address_line2: z.string().optional().nullable(),
  city: z.string().min(1, "City is required"),
  state: z.string().optional().nullable(),
  country: z.string().min(1, "Country is required"),
  zip_code: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().email("Invalid email format").optional().nullable(),
  rating: z.number().min(0).max(5).optional().nullable(),
});

// Update Hotel DTO
export const UpdateHotelDTO = CreateHotelDTO.partial();

// Response Hotel DTO
export const HotelResponseDTO = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  address_line1: z.string(),
  address_line2: z.string().nullable(),
  city: z.string(),
  state: z.string().nullable(),
  country: z.string(),
  zip_code: z.string().nullable(),
  latitude: z.string().nullable(),
  longitude: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.string().nullable(),
  rating: z.number().nullable(),
  created_at: z.date(),
  updated_at: z.date(),
});

// Type exports
export type CreateHotelInput = z.infer<typeof CreateHotelDTO>;
export type TUpdateHotelInput = z.infer<typeof UpdateHotelDTO>;
export type HotelResponse = z.infer<typeof HotelResponseDTO>;
