
export async function GetHashtags(req,res){

    const {hashtag} = req.params;

    try{

       const {rows:postsRelated} =  await hashtagRepository.getHashtag(hashtag)

       if(postsRelated.length<1){
           return res.send("There is stil no #HASHTAG like this. It's up to you to start a new #HASHTAG. Why don't start now?")
       }
       res.send(postsRelated)
    }catch{
        res.send("Somenthing went wrong on your request, please try it again")

    }
}

export async function RankHashtags(req,res){


    try{

        const {rows:topHashtags} =  await hashtagRepository.TopHashtag()
 
        if(postsRelated.length<1){
            return res.send("There is stil no #HASHTAG")
        }
        res.send(topHashtags)
     }catch{
         res.send("Somenthing went wrong on your request, please try it again")
 
     }

}