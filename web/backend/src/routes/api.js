import { Router } from 'express'
import entriesRouter from './entries.js'
import usersRouter from './users.js'

const router = Router()

router.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

router.use('/users', usersRouter)
router.use('/entries', entriesRouter)

export default router
