'use strict';
const express =require('express');
require('dotenv').config();
const cors =require('cors');
const axios=require('axios');
// const weather =require('./assets/weather.json');
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

let arrmoview=[];
class Movies{
    constructor(item){
        this.title=item.title;
        this.overview=item.overview;
        this.average_votes=item.vote_average;
        this.image_url=`https://image.tmdb.org/t/p/w500/${item.poster_path}`;
        this.total_votes=item.vote_count;
        this.image_url=item.image_url;
        this.popularity=item.popularity;
        this.released_on=item.release_date;
        Moviesarray.push(this)
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
        return new Forecatst(w);
    })
    console.log(selectedData);
    
    res.send(selectedData)
    .catch(error=>{
        res.status(500).send(error)
    })
   
})

}

let selectedMovie=[];
//http:localhost:3001/movies?cityName=Amman
server.get('/movies',getMovie);
function getMovie(req,res){
    let result=req.query.cityName;
   let movieUrl=`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${result}`
    
    axios.get(movieUrl).then(movieData=>{
        selectedMovie=movieData.data.results.map(w=>{
            return new Movies(w);
        })
       
    })
    console.log(selectedMovie);
    res.send(selectedMovie)
   
    .catch(error=>{
        res.status(500).send(error)
    })
}


server.get('*',(req,res)=>{
    res.status(404).send('the city not found')
})