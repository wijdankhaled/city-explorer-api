'use strict';
const express =require('express');
require('dotenv').config();
const cors =require('cors');
const axios=require('axios');
const weather =require('./assets/weather.json');
// const { query } = require('express');

const server=express();
const PORT =process.env.PORT;
server.use(cors());

server.listen(PORT,()=>{
    console.log(`listnin on PORT ${PORT}`)
})
//make it public to all client 


let arr=[];
class Forecatst{
    constructor (w){
        this.description=w.weather.description
        this.data=w.datetime
        arr.push(this);
    }
}

//http:localhost:3001/weather?cityName=Amman&lon=35.91&lat=31.95
//
// server.get('/weather',(req,res)=>{
//     console.log(req.query)
//     let cityname=req.query.cityname
//     let selectedData=weather.find((w)=>{
//         if(w.cityname==cityname ){
//             return w
//         }
//     })

// for(let i=0;i<selectedData.data.length;i++){
//     new serv(selectedData.data[i].weather.description,selectedData.data[i].valid_date)
// }

//     res.send(arr)


// })

server.get('/',test);
function test (req,res){
    res.send('iam working')
}
let selectedData=[];
//https://api.weatherbit.io/v2.0/forecast/daily?city=Amman&key=
//http:localhost:3001/weather?cityName=Amman
server.get('/weather',getWeather);
function getWeather(req,res){
let searchQ=req.query.cityName;

let weatherUrl=`https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQ}&key=${process.env.WEATHER_API_KEY}`

axios.get(weatherUrl).then(weatherData=>{
     selectedData=weatherData.data.data.map(w=>{
        // if(w.city_name==searchQ ){
        //     return new Forecatst(w);
        // }

        return new Forecatst(w);
        
    })
    console.log(selectedData);
    // for(let i=0;i<selectedData.data.length;i++){
    //     new serv(selectedData.data[i].weather.description,selectedData.data[i].valid_date)
    // }
    res.send(selectedData[0])
   
})
// .catch(error=>{
//     res.status(500).send(error)
// })
}

server.get('*',(req,res)=>{
    res.status(404).send('the city not found')
})