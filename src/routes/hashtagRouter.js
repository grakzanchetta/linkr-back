import { Router } from "express"
import { GetHashtags, RankHashtags } from "../controllers/hashtagController.js"


const router = Router()


// router.post('/post', registerHash, PostPost)
router.get('/hashtag/:hashtag', GetHashtags)
router.get('/tophashtags', RankHashtags)

export default router;