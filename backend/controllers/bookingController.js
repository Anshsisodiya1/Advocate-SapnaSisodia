const Booking = require("../models/Booking");


// CREATE BOOKING
exports.createBooking = async(req,res)=>{
try{

const booking = new Booking(req.body);

await booking.save();

res.json({
message:"Consultation booked successfully",
booking
});

}catch(error){
res.status(500).json({message:error.message});
}
};


// GET ALL BOOKINGS (ADMIN)
exports.getBookings = async(req,res)=>{
try{

const bookings = await Booking.find().sort({createdAt:-1});

res.json(bookings);

}catch(error){
res.status(500).json({message:error.message});
}
};


// UPDATE BOOKING STATUS
exports.updateBookingStatus = async(req,res)=>{
try{

const booking = await Booking.findByIdAndUpdate(
req.params.id,
{status:req.body.status},
{new:true}
);

res.json(booking);

}catch(error){
res.status(500).json({message:error.message});
}
};