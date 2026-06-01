import { RESULT_TYPES, TYPE_ORDER } from './classifier.js'

const getFallbackType = () => RESULT_TYPES.IDEAS

const getResultTime = (result) =>
  new Date(result?.createdAt || result?.updatedAt || 0).getTime()

export const groupResultsByType = (results = []) => {
  const grouped = TYPE_ORDER.reduce((accumulator, type) => {
    accumulator[type] = []
    return accumulator
  }, {})

  for (const result of results) {
    const type = TYPE_ORDER.includes(result?.resultType)
      ? result.resultType
      : getFallbackType()
    grouped[type].push(result)
  }

  for (const type of TYPE_ORDER) {
    grouped[type].sort((first, second) => getResultTime(second) - getResultTime(first))
  }

  return grouped
}

export const orderGroupedResults = (groupedResults = {}) =>
  TYPE_ORDER.reduce((ordered, type) => {
    ordered[type] = groupedResults[type] || []
    return ordered
  }, {})

export const prepareGroupedResponse = (results = []) =>
  orderGroupedResults(groupResultsByType(results))
