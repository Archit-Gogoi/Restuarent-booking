import express from "express";
import send_reservation from "../controller/reservation.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { get_my_reservations } from "../controller/reservationController.js";
import { cancel_reservation } from "../controller/reservationController.js";
const router = express.Router();

router.post("/send", isAuthenticated, send_reservation);
router.delete("/reservation/:id", isAuthenticated, cancel_reservation);
router.get("/my", isAuthenticated, get_my_reservations);

export default router;
