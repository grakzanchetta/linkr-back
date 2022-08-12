import hashList from "../schemas/hashSchema.js"

export default function findingHash( req, res, next){

    const {postText} = req.body
   
        console.log("1")
        const wordsList = postText.split(" ")

        console.log("2")
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
console.log("vai passsar para post controler")
        next()
           
}