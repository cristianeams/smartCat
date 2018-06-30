var movie = require('./movieAPI'); 
const keywords = ['cafe' , 'resturant' , 'food' , 'coffee']

module.exports = {
    
    generateCategory: function(title) {
    var randCat = checkKeyWord(title).then(() =>{
        if(randCat === - 1) {
            var randCat = movie.getMovieByTitle(title); 
            console.log("CATEGORY NUMBERRRRRR:", randCat);   
        } 
        console.log(randCat , 'hello')
            return randCat ;
        

    })
    // if(randCat === - 1) {
    //     var randCat = movie.getMovieByTitle(title); 
    //     console.log("CATEGORY NUMBERRRRRR:", randCat);   
    // } 
    // console.log(randCat , 'hello')
    //     return randCat ;
    
    // var randCat = movie.getMovieByTitle(title); 
    // console.log("CATEGORY NUMBERRRRRR:", randCat); 
    //return randCat; 
    }
}

function checkKeyWord (title) {
    return new Promise((resolve , reject) => {
        const keywords = ['cafe' , 'resturant' , 'food' , 'coffee']    
        textInput = function (str) {
            return str.toLowerCase().split(" ");
       };
       for(var i = 0 ; i < textInput(title).length ; i++ ) {
            if(keywords.indexOf(textInput(title)[i]) >= 0){
                randCat = 1 ;
            } else if(keywords.indexOf(textInput(title)[i])){
                var randCat = -1 
            } 
       
       }
       console.log(randCat)
       return randCat ;
    }).then(function (randCat){
    return randCat ;   
    }).catch(() => {
        console.log("Sorry")
    }).then(() => {
        return randCat;    })
    
 
}




