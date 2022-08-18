import { Router } from "express";
import { GetHashtags, RankHashtags } from "../controllers/hashtagController.js";
import tokenValidator from "../middlewares/tokenValidator.js";

const router = Router();

// router.post('/post', registerHash, PostPost)
router.get("/hashtag/:hashtag", tokenValidator, GetHashtags);
router.get("/tophashtags", RankHashtags);

export default router;
