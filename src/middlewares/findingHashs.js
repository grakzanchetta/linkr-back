export async function registerHash(req, res, next){

    const {post} = req.body

    try{

        const wordsList = post.split(" ")

        const hashList =[]

        wordsList.filter(element =>{
            console.log(element)
             if(element.includes("#")){
                        if(element.search("#")=== 1){
                            const allPossibleHash = element.split("#")
                             console.log(allPossibleHash)
                           allPossibleHash.map(hash=> hashList.push(hash.toLowerCase()))
        
                        }else{
                            const allPossibleHash = element.split("#")
                            allPossibleHash.shift()
                            allPossibleHash.map(hash=> hashList.push(hash.toLowerCase()))}
             }
            else{ return false}
        })
            }catch{
                res.send("Something went wrong processing your hashtag.")
            }

    next()
}