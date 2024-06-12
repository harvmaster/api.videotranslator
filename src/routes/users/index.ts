import Express from 'express'

import getUser from './getUser'
import createUser from './createUser'

import google from './google'

const router = Express.Router()

router.get('/', getUser)
router.post('/', createUser)

router.use('/google', google)

export default router