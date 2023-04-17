const express=require('express');
const router = express.Router();
const {PrismaClient}=require('@prisma/client');
const prisma=new PrismaClient();

router.post('/login',async (req,res)=>{
    const userdetails=await prisma.users.findMany({
        where : {
            email: req.body.email,
            password: req.body.password,
        }
    })
    res.status(200).json(userdetails);
})
router.get('/getemail/:id',async (req,res)=>{
    const email= await prisma.users.findMany({
        where: {
            id: parseInt(req.params.id)
        },
        select: {
            email: true
        }
    })
    console.log(email);
    res.status(200).json(email)
})
router.post('/signup',async (req,res)=>{
    // console.log("oyeee................",req.body);
    await prisma.users.create({
        data : {
            name : req.body.name,
            email: req.body.email,
            password: req.body.password,
        }
    })
    res.status(200).json({
        'message' : 'user created successfully'
    });
})

module.exports=router;


