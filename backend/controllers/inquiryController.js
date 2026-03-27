const Inquiry = require("../models/inquiry");
const transporter = require("../config/email");

exports.submitInquiry = async(req,res)=>{
try{

const {name,email,phone,subject,message} = req.body;

const inquiry = new Inquiry({
name,
email,
phone,
subject,
message
});

await inquiry.save();


// EMAIL TO ADMIN
await transporter.sendMail({

from:process.env.EMAIL_USER,
to:process.env.EMAIL_USER,

subject:"New Website Inquiry",

html:`
<h2>New Client Inquiry</h2>

<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Phone:</strong> ${phone}</p>
<p><strong>Subject:</strong> ${subject}</p>
<p><strong>Message:</strong> ${message}</p>
`

});


// AUTO REPLY TO USER
await transporter.sendMail({

from:process.env.EMAIL_USER,
to:email,

subject:"Thank you for contacting us",

html:`
<h3>Thank You for Contacting Us</h3>

<p>Dear ${name},</p>

<p>Thank you for reaching out to our legal team.</p>

<p>We have received your inquiry and our team will contact you shortly.</p>

<p>Best Regards,<br>
Advocate Sapna Sisodiya Legal Team</p>
`

});

res.json({
message:"Inquiry submitted successfully"
});

}catch(error){
res.status(500).json({message:error.message});
}
};