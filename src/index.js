import dotenv from 'dotenv';
import { connectDB } from './DB/index.js';
import { app } from './app.js';
import axios from 'axios';
dotenv.config({
    path: "./env"
})

const API_URL = "https://smartkart-server.onrender.com/api/v1/ping/ping";
const makeAPICall = async () => {
    try {
        axios.get(API_URL);
        console.log("Made api call");
    } catch (error) {
        console.error("Error making API call:", error);
    }
};

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log("Server listening on port " + process.env.PORT);
    })
    // Call makeAPICall every 5 minutes (300000 milliseconds)
    setInterval(makeAPICall, 1000*60*10);
})
.catch((err)=>{
    console.log("MONGO DB connection failed !", err);
})
