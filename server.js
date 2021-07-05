'use strict';
const express =require('express');
require('dotenv').config();
const cors =require('cors');

const weather =require('./assets/weather.json')

const server=express();
const PORT =process.env.PORT;
server.use(cors());

server.listen(PORT,()=>{
    console.log(`listnin on PORT ${PORT}`)
})
//make it public to all client 


let arr=[];
class serv{
    constructor (description,data){
        this.description=description
        this.data=data
        arr.push(this);
    }
}

//http:localhost:3001/weather?cityName=Amman&lon=35.91&lat=31.95
server.get('/weather',(req,res)=>{
    console.log(req.query)
    let cityname=req.query.cityname
    let lon=req.query.lon
    let lat=req.query.lat
    let selectedData=weather.find((w)=>{
        if(w.cityname==cityname && w.lon==lon &&w.lat==lat){
            return w
        }
    })

for(let i=0;i<selectedData.data.length;i++){
    new serv(selectedData.data[i].weather.description,selectedData.data[i].valid_date)
}

    res.send(arr)


})

server.get('*',(req,res)=>{
    res.status(404).send('the city not found')
})