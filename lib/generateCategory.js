var movie = require('./movieAPI'); 


module.exports = {
    generateCategory: function(title) {
        var randCat = movie.getMovieByTitle(title); 
        console.log("CATEGORY NUMBERRRRRR:", randCat); 
        return randCat; 
    }
}





