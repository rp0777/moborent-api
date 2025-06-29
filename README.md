# 🚗 Moborent – Car Rental API

A robust backend system built with NestJS for managing car rentals, bookings, and wishlists. Designed with scalability and modularity in mind, and supports advanced filtering, and future integrations like role-based access and authentication systems (e.g., Auth0).

---

## 🔧 Tech Stack

| Layer       | Technology         |
|------------|--------------------|
| Framework   | [NestJS](https://nestjs.com) (TypeScript) |
| Database    | MongoDB (via Mongoose) |
| Validation  | class-validator / class-transformer |
| ORM         | Mongoose |
| Docs        | Swagger (auto-generated via decorators) |
| Logging     | NestJS Logger |
| Config      | `@nestjs/config` with `.env` support |

> 🛡️ **Authentication**: Planned support for JWT & Auth0 (coming soon...)

---

## 📁 Project Structure

- **`cars/`** – Car management: listing, filtering, sorting, and CRUD operations  
- **`bookings/`** – Booking logic: create, fetch, search, date conflict checks  
- **`wishlist/`** – Save and manage user wishlists/bookmarked bookings  
- **`common/`** – Shared DTOs, exception filters, utilities, etc.  
- **`app.module.ts`** – Root module to import and wire all other modules  
- **`app.controller.ts` / `app.service.ts`** – Default NestJS app controller and service

---

## 🚀 Getting Started / Local Setup

### 1. Clone & Install

```bash
git clone https://github.com/your-username/moborent-api.git
cd moborent-api
npm install
# Start in dev mode
npm run start:dev
App will be running at: http://localhost:3000

Swagger Docs: http://localhost:3000/api
```

## 💾 MongoDB Schema Summary

#### 🚘 Car Document

{
  brand: String,
  model: String,
  year: Number,
  color: String,
  licensePlate: String (unique),
  dailyRate: Number,
  isAvailable: Boolean,
  features: [String],
  images: [String],
  description: String,
  mileage: Number,
  fuelType: "diesel" | "electric",
  transmission: "manual" | "automatic",
  seats: Number,
  location: String,
}

#### 📅 Booking Document

{
  carId: ObjectId,
  userEmail: String,
  startDate: Date,
  endDate: Date,
  pickupLocation: String,
  contactNumber: String,
  totalPrice: Number
}

#### ❤️ Wishlist Document

{
  email: String,
  carId: ObjectId
}




