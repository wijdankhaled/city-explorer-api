const axios=require('axios')

module.exports=getWeather;

//https://api.weatherbit.io/v2.0/forecast/daily?city=Amman&key=
//http:localhost:3001/weather?cityName=Amman
let selectedData=[];
function getWeather(req,res){
    let searchQ=req.query.cityName;
    
    let weatherUrl=`https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQ}&key=${process.env.WEATHER_API_KEY}`
    
    axios
    .get(weatherUrl)
    .then(weatherData=>{
         selectedData=weatherData.data.data.map(w=>{
            return new Forecatst(w);
        })
        // console.log(selectedData);
        
        res.send(selectedData)
        // .catch(error=>{
        //     res.status(500).send(error)
        // })
       
    })
    
    }

    let arr=[];
class Forecatst{
    constructor (w){
        this.description=w.weather.description
        this.data=w.datetime
        arr.push(this);
    }
}