import mongoose from 'mongoose'
import { TYPE_ORDER } from '../utils/classifier.js'

const resultSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    text: {
      type: String,
      default: null,
    },
    links: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
    favicon: {
      type: String,
      default: null,
    },
    resultType: {
      type: String,
      enum: TYPE_ORDER,
      required: true,
      index: true,
    },
    source: {
      type: String,
      default: null,
      trim: true,
    },
    classificationConfidence: {
      type: Number,
      min: 0,
      max: 1,
      default: 0.1,
    },
  },
  {
    timestamps: true,
  },
)

const Result = mongoose.model('Result', resultSchema)

export default Result
