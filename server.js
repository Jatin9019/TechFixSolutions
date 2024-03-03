import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import authRoute from './routes/authRoute.js'
import usedProductsRoutes from './routes/usedProductsRoutes.js'
import productCategoryRoutes from './routes/productCategoryRoutes.js'
import newProductsRoutes from './routes/newProductsRoutes.js'
import complaintCategoryRoutes from './routes/complaintCategoryRoutes.js'
import usedProductConditionCategoriesRoutes from './routes/usedProductConditionCategoriesRoutes.js';
import repairRequestRoutes from './routes/repairRequestRoutes.js'

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

app.use("/api/v1/auth", authRoute)
app.use("/api/v1/productCategory", productCategoryRoutes)
app.use("/api/v1/usedProducts", usedProductsRoutes)
app.use("/api/v1/newProducts", newProductsRoutes)
app.use("/api/v1/complaintCategory", complaintCategoryRoutes)
app.use("/api/v1/usedProductConditions", usedProductConditionCategoriesRoutes)
app.use("/api/v1/repairRequests", repairRequestRoutes)

const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`.bgCyan.white)
})