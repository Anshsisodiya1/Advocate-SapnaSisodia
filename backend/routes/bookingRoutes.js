const express = require("express");
const router = express.Router();

const {
createBooking,
getBookings,
updateBookingStatus
} = require("../controllers/bookingController");

const authMiddleware = require("../middleware/authMiddleware");


// USER BOOK CONSULTATION
router.post("/",createBooking);


// ADMIN VIEW BOOKINGS
router.get("/",authMiddleware,getBookings);


// ADMIN UPDATE STATUS
router.put("/:id",authMiddleware,updateBookingStatus);

module.exports = router;