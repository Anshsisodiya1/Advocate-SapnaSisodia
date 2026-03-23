exports.getWhatsAppLink = (req,res)=>{

const phone = process.env.WHATSAPP_NUMBER;

const message = "Hello I need legal consultation";

const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

res.json({url});

};