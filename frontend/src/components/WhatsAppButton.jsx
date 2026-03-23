import { useState, useEffect } from "react";
import axios from "axios";
import { FaWhatsapp } from "react-icons/fa";
import "../styles/WhatsAppButton.css";

export default function WhatsAppButton(){

const [url,setUrl] = useState("");

useEffect(()=>{

axios.get("http://localhost:5000/api/whatsapp")
.then(res=>{
setUrl(res.data.url);
});

},[]);

const openWhatsApp = ()=>{
if(url){
window.open(url,"_blank");
}
};

return(

<button
className="whatsapp-btn"
onClick={openWhatsApp}
>
<FaWhatsapp className="whatsapp-icon" />
</button>

);

}