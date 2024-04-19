import express from "express";


const port = 3000; // server runs on port 3000
const app = express();
//"Date()" allows us to know what day it is

const weekDayAdvice = "it's time to work hard";
const weekendAdvice = "it's the weekend, time to relax";
const weekNameArray = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];


//using this middleware to know what day it is for the client
// and then sending that information in the req for the next middleware
app.use((req,res,next) => {
    req.currentDay = new Date("June 25, 2023 11:13:00").getDay();
    console.log("first middleware app.use");
    next();
})

app.get("/", (req, res) => {
    console.log("second middleware");
    let currentAdvice = "";
    const currentDay = req.currentDay;
    if( 0 <= currentDay && currentDay < 4)
        currentAdvice = weekDayAdvice;
    else
        currentAdvice = weekendAdvice;

    console.log("after logic");
    res.render("index.ejs", {
        day : weekNameArray[currentDay],
        advice : currentAdvice,
    }); 
    console.log("after render");
  });
  
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  