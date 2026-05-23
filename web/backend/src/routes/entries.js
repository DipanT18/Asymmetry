import { Router } from 'express'
import Entry from '../models/Entry.js'
import User from '../models/User.js'

const router = Router()

router.get('/', async (req, res, next) => {
  try {
    const entries = await Entry.find()
      .populate('author', 'name email')
      .sort({ createdAt: -1 })
    res.json({ data: entries })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { title, body, status, authorId } = req.body
    if (!title || !body || !authorId) {
      return res.status(400).json({
        message: 'Title, body, and authorId are required.',
      })
    }

    const author = await User.findById(authorId)
    if (!author) {
      return res.status(404).json({
        message: 'Author not found.',
      })
    }

    const entry = await Entry.create({
      title,
      body,
      status,
      author: author._id,
    })

    const populatedEntry = await Entry.findById(entry._id).populate(
      'author',
      'name email',
    )

    res.status(201).json({ data: populatedEntry })
  } catch (error) {
    next(error)
  }
})

export default router
