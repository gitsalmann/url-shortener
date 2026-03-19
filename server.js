import express from 'express'
import dotenv from 'dotenv'
import { connectRedis } from './config/redis.js'
import urlRoutes from './routes/urlRoutes.js'

dotenv.config()

const app = express()
app.use(express.json())

app.use("/", urlRoutes)
app.get("/", (req, res) =>{
    res.send("Url Shortener working")
})

const PORT = process.env.PORT || 3000

connectRedis().then(()=>{
    app.listen(PORT, () =>{
        console.log(`server running on port ${PORT}`);
    })
})
