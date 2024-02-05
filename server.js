import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
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

const PORT = process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`.bgCyan.white)
})