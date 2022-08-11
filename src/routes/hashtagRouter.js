import { Router } from "express"


const router = Router()

router.get('/hashtag/:hashtag', GetHashtags)