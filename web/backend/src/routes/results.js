import { Router } from 'express'
import {
  getAllResultsGrouped,
  getResultsByType,
  storeResult,
} from '../controllers/resultsController.js'

const router = Router()

router.get('/', getAllResultsGrouped)
router.post('/store', storeResult)
router.get('/:type', getResultsByType)

export default router
