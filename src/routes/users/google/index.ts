import Express from 'express'

import loginWithGoogle from './login'
import callbackFromGoogle from './callback'

const router = Express.Router()

router.get('/', loginWithGoogle)
router.get('/callback', callbackFromGoogle)

export default router