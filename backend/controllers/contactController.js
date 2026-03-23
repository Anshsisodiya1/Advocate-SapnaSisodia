const mongoose = require("mongoose");
const Contact = require("../models/Contact");
exports.createContact = async (req,res)=>{

try{

const contact = new Contact(req.body)

await contact.save()

res.status(201).json({
success:true,
message:"Message sent successfully"
})

}catch(error){

res.status(500).json({error:error.message})

}
}


// Get all contacts
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Delete Contact
exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid contact ID" });
    }

    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({ success: false, message: "Inquiry not found" });
    }

    res.status(200).json({ success: true, message: "Inquiry deleted successfully" });
  } catch (error) {
    console.error("Delete contact error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};