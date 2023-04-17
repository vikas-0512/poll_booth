const express=require('express')
const router=express.Router();
const {PrismaClient}=require('@prisma/client');
const prisma=new PrismaClient();

router.get('/all/:teamid',async (req,res)=>{
    let teamid=parseInt(req.params.teamid)
    const polls=await prisma.polls.findMany({
        where: {
            teamid : teamid
        }
    })
    res.status(200).json(polls);
})

router.post('/addpoll/:teamid',async (req,res)=>{
    var teamid=parseInt(req.params.teamid);
    try{
        const polls=await prisma.polls.create({
            data : {
                pollname: req.body.pollname,
                teamid,
            }
        })
        res.status(200).json({
            message: "poll created successfully"
        })
    }
    catch (err)
    {
        console.log(err)
        res.status(400).json({
            message: err.message
        })
    }
})

router.post('/addoption/:pollid',async (req,res)=>{
    let pollid=parseInt(req.params.pollid);
    try{
        await prisma.options.create({
            data: {
                pollid: pollid,
                optionname: req.body.optionname
            }
        })
        res.json({
            message: "option added successfully"
        })
    }
    catch(err){
        res.status(500).json({
            message: "error in adding option"
        })
    }
})

router.get('/getpolldetails/:pollid',async (req,res)=>{
    let pollid = parseInt(req.params.pollid);
    const polls=await prisma.options.findMany({
        where : {
            pollid: pollid
        }
    }) 
    res.status(200).json(polls)
})

router.put('/vote/:optionid',async (req,res)=>{
    let optionid= parseInt(req.params.optionid);
    let votes= await prisma.options.findMany({
        where : {
            optionid: optionid,
        },
        select: {
            votes: true, 
        }
    })
    votes=parseInt(votes[0].votes);
    ++votes;
    await prisma.options.update({
        where: {
            optionid: optionid
        },
        data: {
            votes: votes
        }
    })
    res.status(200).json({
        message: "voted successfully"
    })
})
//http://localhost:8000/polls/delmem
router.delete('/delmem',async(req,res)=>{
    await prisma.members.deleteMany({
        where: {
            userid: parseInt(req.body.userid),
            teamid: parseInt(req.body.teamid)
        }
    })
    res.status(200).json({
        message:"deleted successfully"
    })
})

module.exports=router;
