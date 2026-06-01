import { Router } from 'express'
import { saveResult } from '../controllers/resultsController.js'
import { classifyResult } from '../utils/classifier.js'
import { scrapeWebsite } from '../utils/scraper.js'

const router = Router()

const parseOptionalNumber = (value, fieldName) => {
  if (value === undefined || value === null || value === '') return undefined
  const parsed = Number.parseInt(value, 10)
  if (Number.isNaN(parsed) || parsed <= 0) {
    throw new Error(`${fieldName} must be a positive integer.`)
  }
  return parsed
}

const parseBoolean = (value) => {
  if (value === true || value === 'true' || value === '1') return true
  if (value === false || value === 'false' || value === '0') return false
  return undefined
}

const buildOptions = (source) => ({
  timeoutMs: parseOptionalNumber(source.timeoutMs, 'timeoutMs'),
  maxTextLength: parseOptionalNumber(source.maxTextLength, 'maxTextLength'),
  maxLinks: parseOptionalNumber(source.maxLinks, 'maxLinks'),
  maxImages: parseOptionalNumber(source.maxImages, 'maxImages'),
  includeHtml: parseBoolean(source.includeHtml),
})

const parseOptionalString = (value) => {
  if (Array.isArray(value)) return parseOptionalString(value[0])
  if (typeof value !== 'string') return undefined
  const normalized = value.trim()
  return normalized || undefined
}

const normalizeValidationError = (error) => {
  if (error?.message?.includes('positive integer')) {
    error.statusCode = 400
  }
}

const handleScrape = async (req, res, next) => {
  try {
    const input = req.method === 'GET' ? req.query : req.body
    const rawUrl = input?.url
    const url = Array.isArray(rawUrl) ? rawUrl[0] : rawUrl
    if (!url) {
      return res.status(400).json({ message: 'url is required.' })
    }
    const options = buildOptions(input)
    const data = await scrapeWebsite(url, options)
    const classification = classifyResult(data)
    const shouldStore = parseBoolean(input?.store) === true
    let storedResult

    if (shouldStore) {
      const source = parseOptionalString(input?.source)
      const result = await saveResult({
        ...data,
        source,
        resultType: classification.resultType,
        classificationConfidence: classification.confidence,
      })
      storedResult = result.data
    }

    return res.json({
      data: {
        ...data,
        resultType: classification.resultType,
        classificationConfidence: classification.confidence,
        ...(storedResult ? { storedResult } : {}),
      },
    })
  } catch (error) {
    normalizeValidationError(error)
    return next(error)
  }
}

router.get('/', handleScrape)
router.post('/', handleScrape)

router.get('/metadata', async (req, res, next) => {
  try {
    const { url: rawUrl, timeoutMs } = req.query
    const url = Array.isArray(rawUrl) ? rawUrl[0] : rawUrl
    if (!url) {
      return res.status(400).json({ message: 'url is required.' })
    }
    const options = buildOptions({ timeoutMs })
    const { text, links, images, html, ...metadata } = await scrapeWebsite(
      url,
      options,
    )
    return res.json({ data: metadata })
  } catch (error) {
    normalizeValidationError(error)
    return next(error)
  }
})

router.get('/text', async (req, res, next) => {
  try {
    const { url: rawUrl, maxTextLength, timeoutMs } = req.query
    const url = Array.isArray(rawUrl) ? rawUrl[0] : rawUrl
    if (!url) {
      return res.status(400).json({ message: 'url is required.' })
    }
    const options = buildOptions({ maxTextLength, timeoutMs })
    const { url: finalUrl, text } = await scrapeWebsite(url, options)
    return res.json({ data: { url: finalUrl, text } })
  } catch (error) {
    normalizeValidationError(error)
    return next(error)
  }
})

export default router
