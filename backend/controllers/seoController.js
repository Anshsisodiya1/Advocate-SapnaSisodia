const Seo = require("../models/Seo");


exports.getSeo = async(req,res)=>{

const page = req.params.page;

const seo = await Seo.findOne({page});

res.json(seo);

};


exports.updateSeo = async(req,res)=>{

const page = req.params.page;

const seo = await Seo.findOneAndUpdate(
{page},
req.body,
{new:true,upsert:true}
);

res.json(seo);

};