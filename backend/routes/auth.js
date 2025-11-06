import express from "express";
import passport from "../middlewares/passport.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Redirect user to Google login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback after Google auth
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res, next) => {
    try {
      const user = req.user;
      const token = jwt.sign(
        { id: user.id, email: user.email, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.redirect(`${process.env.FRONTEND_URL}/success?token=${token}`);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
