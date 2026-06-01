export const RESULT_TYPES = Object.freeze({
  HACKATHON: 'hackathon',
  JOB: 'job',
  FUNDING: 'funding',
  SCHOLARSHIP: 'scholarship',
  SEMINAR: 'seminar',
  IDEAS: 'ideas',
})

export const TYPE_ORDER = Object.freeze([
  RESULT_TYPES.HACKATHON,
  RESULT_TYPES.JOB,
  RESULT_TYPES.FUNDING,
  RESULT_TYPES.SCHOLARSHIP,
  RESULT_TYPES.SEMINAR,
  RESULT_TYPES.IDEAS,
])

const KEYWORDS_BY_TYPE = Object.freeze({
  [RESULT_TYPES.HACKATHON]: [
    'hackathon',
    'coding competition',
    'dev challenge',
    'buildathon',
  ],
  [RESULT_TYPES.JOB]: [
    'job',
    'hiring',
    'career',
    'opening',
    'position',
    'apply now',
  ],
  [RESULT_TYPES.FUNDING]: [
    'funding',
    'grant',
    'seed round',
    'investment',
    'capital',
  ],
  [RESULT_TYPES.SCHOLARSHIP]: [
    'scholarship',
    'fellowship',
    'financial aid',
    'tuition support',
  ],
  [RESULT_TYPES.SEMINAR]: [
    'seminar',
    'webinar',
    'workshop',
    'conference',
    'speaker session',
  ],
  [RESULT_TYPES.IDEAS]: ['idea', 'innovation', 'pitch', 'brainstorm'],
})

const buildContent = ({ url, title, description, text }) =>
  `${url || ''} ${title || ''} ${description || ''} ${text || ''}`.toLowerCase()

const isKnownType = (type) => TYPE_ORDER.includes(type)

export const normalizeResultType = (type) => {
  if (!type || typeof type !== 'string') return null
  const normalized = type.toLowerCase()
  return isKnownType(normalized) ? normalized : null
}

export const classifyResult = (content = {}) => {
  const fullText = buildContent(content)

  const scores = TYPE_ORDER.reduce((accumulator, type) => {
    const keywords = KEYWORDS_BY_TYPE[type]
    accumulator[type] = keywords.reduce(
      (score, keyword) => score + (fullText.includes(keyword) ? 1 : 0),
      0,
    )
    return accumulator
  }, {})

  const winningType = TYPE_ORDER.reduce((winner, type) => {
    if (scores[type] > scores[winner]) return type
    return winner
  }, RESULT_TYPES.IDEAS)

  const winningScore = scores[winningType] ?? 0
  const totalScore = Object.values(scores).reduce((total, score) => total + score, 0)
  const confidence =
    totalScore > 0 ? Number((winningScore / totalScore).toFixed(2)) : 0.1

  return {
    resultType: winningType,
    confidence,
    scores,
  }
}
