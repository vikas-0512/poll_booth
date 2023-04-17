const express=require('express');
const cors=require('cors');
const app=express();
app.use(cors());
app.use(express.json());
app.listen(8000,(req,res)=>{
    console.log('listening to port 8000');
})
app.use((req,res,next)=>{
    console.log('request has been received');
    next();
})
const userRouter = require('./routers/userRouter');
const teamRouter = require('./routers/teamRouter');
const membersRouter =require('./routers/membersRouter');
const pollsRouter = require('./routers/pollsrouter');
app.use('/users',userRouter);
app.use('/teams',teamRouter);
app.use('/members',membersRouter);
app.use('/polls',pollsRouter);