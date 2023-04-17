const express=require('express');
const router=express.Router();
const {PrismaClient}=require('@prisma/client');
const prisma= new PrismaClient();

router.get('/:id',async(req,res)=>{
    let id=parseInt(req.params.id);
    const members=await prisma.members.findMany({
        where: {
            teamid: id,
        }
    })
    res.status(200).json(members);
})

router.post('/add',async (req,res)=>{
    try{
        await prisma.members.create({
            data: {
                userid: parseInt(req.body.userid),
                teamid: parseInt(req.body.teamid),
            }
        })
        res.status(200).json({
            message: 'member added successfully'
        })
    }
    catch (err)
    {
        res.status(404).json({
            message: 'user already in team'
        })
    }
})

router.post('/addemail',async (req,res)=>{
    let email=req.body.email;
    try{
        const members= await prisma.users.findMany({
            where : {
                email: email
            }
        })
        console.log(members,members.length);
        if(members.length === 0)
        {
            res.status(400).json({
                message: 'user with that email doesnot exist'
            })
        }
        else{
            console.log(typeof members,typeof members[0]['id'])
            await prisma.members.create({
                data: {
                    userid: members[0]['id'],
                    teamid: parseInt(req.body.teamid),
                }
            })
            console.log("hello")
            res.status(200).json({
                message: 'user added succesfully'
            })
        }
    }
    catch (err) {
        res.status(400).json({
            message : 'unique constraint failed'
        })
    }
})

module.exports= router;