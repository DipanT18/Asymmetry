import Result from '../models/Result.js'
import {
  classifyResult,
  normalizeResultType,
  RESULT_TYPES,
} from '../utils/classifier.js'
import { prepareGroupedResponse } from '../utils/resultsHelper.js'

const sanitizeArray = (value) =>
  Array.isArray(value)
    ? value.filter((item) => typeof item === 'string' && item.trim() !== '')
    : []

const sanitizeConfidence = (value, fallback) => {
  const numericValue = Number(value)
  if (Number.isFinite(numericValue) && numericValue >= 0 && numericValue <= 1) {
    return numericValue
  }
  return fallback
}

const getSource = (source) => {
  if (typeof source !== 'string') return null
  const normalizedSource = source.trim()
  return normalizedSource || null
}

export const saveResult = async (input = {}) => {
  const url = typeof input.url === 'string' ? input.url.trim() : ''
  if (!url) {
    const error = new Error('url is required.')
    error.statusCode = 400
    throw error
  }

  const normalizedType = normalizeResultType(input.resultType)
  const classification = normalizedType
    ? { resultType: normalizedType, confidence: 1 }
    : classifyResult(input)

  const payload = {
    url,
    title: input.title ?? null,
    description: input.description ?? null,
    text: input.text ?? null,
    links: sanitizeArray(input.links),
    images: sanitizeArray(input.images),
    favicon: input.favicon ?? null,
    resultType: classification.resultType || RESULT_TYPES.IDEAS,
    source: getSource(input.source),
    classificationConfidence: sanitizeConfidence(
      input.classificationConfidence,
      classification.confidence,
    ),
  }

  const existingResult = await Result.findOne({ url })
  if (existingResult) {
    existingResult.set(payload)
    const updatedResult = await existingResult.save()
    return { data: updatedResult, isNew: false }
  }

  const createdResult = await Result.create(payload)
  return { data: createdResult, isNew: true }
}

export const getAllResultsGrouped = async (req, res, next) => {
  try {
    const results = await Result.find().sort({ createdAt: -1 }).lean()
    return res.json({ data: prepareGroupedResponse(results) })
  } catch (error) {
    return next(error)
  }
}

export const getResultsByType = async (req, res, next) => {
  try {
    const type = normalizeResultType(req.params.type)
    if (!type) {
      return res.status(400).json({ message: 'Invalid result type.' })
    }

    const results = await Result.find({ resultType: type })
      .sort({ createdAt: -1 })
      .lean()
    return res.json({ data: results })
  } catch (error) {
    return next(error)
  }
}

export const storeResult = async (req, res, next) => {
  try {
    const { data, isNew } = await saveResult(req.body || {})
    return res.status(isNew ? 201 : 200).json({ data })
  } catch (error) {
    return next(error)
  }
}
