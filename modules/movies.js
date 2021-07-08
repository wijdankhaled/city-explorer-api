const axios=require('axios')

module.exports=getMovie;

let selectedMovie=[];
function getMovie(req,res){
    let result=req.query.cityName;
    // console.log(result);
   let movieUrl=`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${result}`

    
    axios.get(movieUrl).then(movieData=>{
        selectedMovie=movieData.data.results.map(w=>{
            console.log("poster_path",w.poster_path);
            return new Movies(w);
           
        })
        // console.log(selectedMovie);
        res.send(selectedMovie);
        // res.json(selectedMovie);
    })
   
    
   
    .catch(error=>{
        res.status(500).send(error,'No movie data for htis city')
    })
}

class Movies{
    constructor(item){
        this.title=item.title;
        this.overview=item.overview;
        this.average_votes=item.vote_average;
        // if(item.poster_path)

        this.image_url=`https://image.tmdb.org/t/p/w500/${item.poster_path}`;
        // else
        
        this.total_votes=item.vote_count;
        this.popularity=item.popularity;
        this.released_on=item.release_date;
        console.log("from coct",item.poster_path);
      
     }
}