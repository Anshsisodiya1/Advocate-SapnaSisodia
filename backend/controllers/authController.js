const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// admin registration

exports.registerAdmin = async (req, res) => {
  try {

    const adminCount = await Admin.countDocuments();

    if (adminCount > 0) {
      return res.status(403).json({
        message: "Admin already exists"
      });
    }

    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "Admin created successfully"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Check if admin exists (for registration flow)
exports.checkAdminExists = async (req, res) => {
  try {

    const count = await Admin.countDocuments();

    res.json({
      adminExists: count > 0
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/// Admin Login

exports.loginAdmin = async (req,res)=>{
try{

const {email,password} = req.body;

const admin = await Admin.findOne({email});

if(!admin){
return res.status(400).json({message:"Admin not found"});
}

const isMatch = await bcrypt.compare(password,admin.password);

if(!isMatch){
return res.status(400).json({message:"Invalid credentials"});
}

const token = jwt.sign(
{ id: admin._id },
process.env.JWT_SECRET,
{ expiresIn: "7d" }
);

res.json({
token,
admin:{
id:admin._id,
name:admin.name,
email:admin.email
}
});

}catch(error){
res.status(500).json({message:error.message});
}
};