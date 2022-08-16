import { Router } from 'express'

import usersRouter from './usersRouter.js'

import hashtagRouter from './hashtagRouter.js'
import postsRouter from './postsRouter.js'
import likesRouter from './likesRouter.js'
import relationshipsRouter from './relationshipsRouter.js'

const router = Router()

router.use(usersRouter)

router.use(hashtagRouter)

router.use(postsRouter)

router.use(likesRouter)

router.use(relationshipsRouter)

export default router
