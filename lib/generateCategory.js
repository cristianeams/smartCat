var movie = require('./movieAPI'); 

var eatKeywords = ['restaurant', 'cafe', 'food', 'coffee']



module.exports = {
    generateCategory: function(title) {
        
        
            return movie.getMovieByTitle(title); 
       
    },
    eatKeywordsExists: function(wordsList) {
        console.log(wordsList);
        let hasEatKeyword = false;
    
        wordsList.map(word => {
            eatKeywords.find(keyword => {
                if (keyword === word) {
                    hasEatKeyword = true;
                }
            })
        })
    
        return hasEatKeyword;
    
    //  for(var i = 0; i < wordsList.length; i++) {
    //         if(eatKeywords.indexOf(wordsList[i])){
    //             return true; 
    //         } else {
    //             return false; 
    //         }
    //     }
    }
    
}





