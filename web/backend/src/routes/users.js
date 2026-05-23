import { Router } from 'express'
import User from '../models/User.js'

const router = Router()

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 })
    res.json({ data: users })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { name, email } = req.body
    if (!name || !email) {
      return res.status(400).json({
        message: 'Name and email are required.',
      })
    }

    const user = await User.create({ name, email })
    res.status(201).json({ data: user })
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({
        message: 'Email already exists.',
      })
    }
    return next(error)
  }
})

export default router
