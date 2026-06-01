import { Router } from 'express'
import entriesRouter from './entries.js'
import resultsRouter from './results.js'
import scraperRouter from './scraper.js'
import usersRouter from './users.js'

const router = Router()

router.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

router.use('/users', usersRouter)
router.use('/entries', entriesRouter)
router.use('/scraper', scraperRouter)
router.use('/results', resultsRouter)

export default router
