import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import reviewRouter from './routes/reviewRoute.js'
import mongoose from 'mongoose'

// App Config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// Drop the unique compound index from reviews collection to allow multiple reviews
// This runs once at server startup to fix existing database structure
const dropUniqueReviewIndex = async () => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    const hasReviewsCollection = collections.some(col => col.name === 'reviews');
    
    if (hasReviewsCollection) {
      console.log('Dropping unique index from reviews collection...');
      await mongoose.connection.db.collection('reviews').dropIndex('userId_1_productId_1').catch(err => {
        // If index doesn't exist or another error occurs, just log it
        console.log('Note about index:', err.message);
      });
    }
  } catch (error) {
    console.log('Error checking/dropping index:', error.message);
  }
};

// Run this after DB connection is established
mongoose.connection.once('open', () => {
  console.log('MongoDB connected');
  dropUniqueReviewIndex();
});

// middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.use('/api/review',reviewRouter)

app.get('/',(req,res)=>{
    res.send("API Working")
})

app.listen(port, ()=> console.log('Server started on PORT : '+ port))