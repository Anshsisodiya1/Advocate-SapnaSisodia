const Blog = require("../models/Blog");
const Booking = require("../models/Booking");
const Inquiry = require("../models/Inquiry");
const Contact = require("../models/contact");

exports.getDashboardStats = async(req,res)=>{
try{

const totalBlogs = await Blog.countDocuments();
const totalBookings = await Booking.countDocuments();
const totalInquiries = await Inquiry.countDocuments();
const totalContacts = await Contact.countDocuments();

res.json({
totalBlogs,
totalBookings,
totalInquiries,
totalContacts,
totalTestimonials
});

}catch(error){
res.status(500).json({message:error.message});
}
};