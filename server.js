import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import authRoute from './routes/authRoute.js'
dotenv.config()

const app = express()

connectDB();

app.use(express.json())
app.use(morgan('dev'))

app.get('/',(req,res)=>{
    res.send({
        message: "Welcome to TechFix Solutions."
    })
})

app.use("/api/v1/auth",authRoute)

const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`.bgCyan.white)
})