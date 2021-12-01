const { assert } = require('console');
const express = require('express');
const router=express.Router();
const Note=require('../models/notemodel');

router.route("/card").post((req,res)=>{
    const cid2=req.body.cid1;
    const count2=req.body.count;
    Note.findOneAndUpdate({cid1:cid2},{$set:{count:count2}},(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
       
    })
    
    
})


router.route("/upload").post((req,res)=>{
    const cid1=req.body.cid1;
    const count=req.body.count;
    const newNote=new Note({
        cid1,
        count
    });
    newNote.save();
})

router.route("/note").get((req,res)=>{
    Note.find().then((foundnotes)=>{
    
    res.json(foundnotes);
}
    )
})





module.exports=router;