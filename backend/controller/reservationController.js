import { Reservation } from "../models/reservation.js";
import ErrorHandler from "../middlewares/error.js";

export const cancel_reservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation)
      return next(new ErrorHandler("Reservation not found!", 404));

    // Check if logged-in user is the owner
    if (reservation.user.toString() !== req.user._id.toString()) {
      return next(new ErrorHandler("You are not allowed to cancel this booking!", 403));
    }

    await reservation.deleteOne();

    res.status(200).json({
      success: true,
      message: "Reservation cancelled successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export const get_my_reservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find({ user: req.user._id });
    res.status(200).json({
      success: true,
      reservations,
    });
  } catch (error) {
    next(error);
  }
};

