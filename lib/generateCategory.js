var movie = require('./movieAPI'); 


module.exports = {
    generateCategory: function(title) {
        var categoryNumber = movie.getMovieByTitle(title); 
        //console.log("CATEGORY NUMBERRRRRR:", categoryNumber); 
        return categoryNumber; 
    }
}





