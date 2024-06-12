import Express from 'express'

import users from './users'
import videos from './videos'

const router = Express.Router()

router.use('/users', users)
router.use('/videos', videos)

export default router