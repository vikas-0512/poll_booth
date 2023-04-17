const express= require('express');
const router=express.Router();
const {PrismaClient}= require('@prisma/client');
const prisma=new PrismaClient();

router.get('/:id',async (req,res)=>{
    var id=parseInt(req.params.id);
    let teamdetails=await prisma.members.findMany({
        where: {
            userid: id,
        },
        select: {
            team: true,
        },
    })
    console.log(teamdetails)
    teamdetails=teamdetails.map((t)=>{
        return t.team;
    })
    res.status(200).json(teamdetails);
})
router.post('/add',async (req,res)=>{
    let teamdetails=await prisma.teams.create({
        data : {
            teamname: req.body.teamname,
            creater: parseInt(req.body.userid),
        }
    })
    console.log(teamdetails);
    await prisma.members.create({
        data: {
            userid: parseInt(req.body.userid),
            teamid: parseInt(teamdetails.teamid),
        }
    })
    res.status(200).json({
        message: 'team created successfully'
    })
})
module.exports=router;