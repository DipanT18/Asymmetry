import { load } from 'cheerio'
import dns from 'node:dns/promises'
import net from 'node:net'

const DEFAULT_TIMEOUT_MS = 15000
const DEFAULT_MAX_TEXT_LENGTH = 12000
const DEFAULT_MAX_LINKS = 75
const DEFAULT_MAX_IMAGES = 40
const USER_AGENT = 
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'

const createError = (statusCode, message) => {
  const error = new Error(message)
  error.statusCode = statusCode
  return error
}

const hasScheme = (value) => /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(value)

const normalizeUrl = (inputUrl) => {
  if (!inputUrl || typeof inputUrl !== 'string') {
    throw createError(400, 'A valid url string is required.')
  }

  const trimmed = inputUrl.trim()
  if (!trimmed) {
    throw createError(400, 'A valid url string is required.')
  }

  const normalized = hasScheme(trimmed) ? trimmed : `https://${trimmed}`
  let parsedUrl
  try {
    parsedUrl = new URL(normalized)
  } catch (error) {
    throw createError(400, 'Unable to parse the provided url.')
  }

  if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
    throw createError(400, 'Only http and https urls are supported.')
  }
  if (parsedUrl.username || parsedUrl.password) {
    throw createError(400, 'Urls with credentials are not allowed.')
  }

  return parsedUrl
}

const isPrivateIp = (address) => {
  if (net.isIPv4(address)) {
    const [first, second] = address.split('.').map(Number)
    if (first === 10) return true
    if (first === 127) return true
    if (first === 0) return true
    if (first === 169 && second === 254) return true
    if (first === 172 && second >= 16 && second <= 31) return true
    if (first === 192 && second === 168) return true
    return false
  }

  if (net.isIPv6(address)) {
    const normalized = address.toLowerCase()
    if (normalized === '::1') return true
    if (normalized.startsWith('fc') || normalized.startsWith('fd')) return true
    if (normalized.startsWith('fe80')) return true
  }

  return false
}

const ensurePublicHost = async (parsedUrl) => {
  const hostname = parsedUrl.hostname.toLowerCase()
  if (hostname === 'localhost' || hostname.endsWith('.local')) {
    throw createError(400, 'Localhost urls are not allowed.')
  }

  let dnsResults
  try {
    dnsResults = await dns.lookup(hostname, { all: true })
  } catch (error) {
    throw createError(400, 'Unable to resolve the provided url.')
  }
  if (!dnsResults?.length) {
    throw createError(400, 'Unable to resolve the provided url.')
  }

  const hasPrivate = dnsResults.some((entry) => isPrivateIp(entry.address))
  if (hasPrivate) {
    throw createError(400, 'Private network urls are not allowed.')
  }
}

const normalizeWhitespace = (value) => value.replace(/\s+/g, ' ').trim()

const resolveUrl = (candidate, baseUrl) => {
  if (!candidate) return null
  try {
    return new URL(candidate, baseUrl).toString()
  } catch (error) {
    return null
  }
}

const pickMetaContent = ($, selectors) => {
  for (const selector of selectors) {
    const value = $(selector).attr('content')
    if (value?.trim()) {
      return value.trim()
    }
  }
  return null
}

const extractMetadata = ($, baseUrl) => {
  const title =
    pickMetaContent($, ['meta[property="og:title"]', 'meta[name="title"]']) ||
    normalizeWhitespace($('title').first().text() || '') ||
    null
  const description =
    pickMetaContent($, [
      'meta[name="description"]',
      'meta[property="og:description"]',
      'meta[name="twitter:description"]',
    ]) || null
  const siteName =
    pickMetaContent($, ['meta[property="og:site_name"]']) || null
  const image =
    resolveUrl(
      pickMetaContent($, [
        'meta[property="og:image"]',
        'meta[name="twitter:image"]',
      ]),
      baseUrl,
    ) || null
  const canonical =
    resolveUrl($('link[rel="canonical"]').attr('href'), baseUrl) || null
  const favicon =
    resolveUrl(
      $('link[rel="icon"]').attr('href') ||
        $('link[rel="shortcut icon"]').attr('href'),
      baseUrl,
    ) || null
  const lang = $('html').attr('lang')?.trim() || null

  return {
    title,
    description,
    siteName,
    image,
    canonical,
    favicon,
    lang,
  }
}

const extractText = ($, maxTextLength) => {
  const SELECTORS = ['main', 'article', '.content', '#content', 'body']

  let rawText = ''

  for (const selector of SELECTORS) {
    const found = normalizeWhitespace($(selector).first().text() || '')
    if (found) {
      rawText = found
      break  // use the first selector that returns text
    }
  }

  if (!rawText) return null

  return rawText.length > maxTextLength
    ? `${rawText.slice(0, maxTextLength)}…`
    : rawText
}

const extractLinks = ($, baseUrl, maxLinks) => {
  const results = []
  const seen = new Set()

  $('a[href]').each((index, element) => {
    if (results.length >= maxLinks) return false
    const href = $(element).attr('href')
    const resolved = resolveUrl(href, baseUrl)
    if (!resolved) return
    if (seen.has(resolved)) return
    if (!resolved.startsWith('http')) return
    seen.add(resolved)
    results.push(resolved)
  })

  return results
}

const extractImages = ($, baseUrl, maxImages) => {
  const results = []
  const seen = new Set()

  $('img[src]').each((index, element) => {
    if (results.length >= maxImages) return false
    const src = $(element).attr('src')
    const resolved = resolveUrl(src, baseUrl)
    if (!resolved) return
    if (seen.has(resolved)) return
    seen.add(resolved)
    results.push(resolved)
  })

  return results
}

const sanitizePositiveNumber = (value, fallback) =>
  Number.isFinite(value) && value > 0 ? value : fallback

export const scrapeWebsite = async (inputUrl, options = {}) => {
  const timeoutMs = sanitizePositiveNumber(
    options.timeoutMs,
    DEFAULT_TIMEOUT_MS,
  )
  const maxTextLength = sanitizePositiveNumber(
    options.maxTextLength,
    DEFAULT_MAX_TEXT_LENGTH,
  )
  const maxLinks = sanitizePositiveNumber(options.maxLinks, DEFAULT_MAX_LINKS)
  const maxImages = sanitizePositiveNumber(
    options.maxImages,
    DEFAULT_MAX_IMAGES,
  )
  const includeHtml = options.includeHtml === true

  const parsedUrl = normalizeUrl(inputUrl)
  await ensurePublicHost(parsedUrl)

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)

  let response
  try {
    response = await fetch(parsedUrl.toString(), {
      signal: controller.signal,
      redirect: 'follow',
      headers: {
        'user-agent': USER_AGENT,
        accept: 'text/html,application/xhtml+xml',
      },
    })
  } catch (error) {
    if (error.name === 'AbortError') {
      throw createError(504, 'The request timed out.')
    }
    throw createError(502, 'Failed to fetch the requested url.')
  } finally {
    clearTimeout(timeout)
  }

  if (!response.ok) {
    if (response.status === 999) {
      throw createError(
        403,
        'The target site blocked this request with LinkedIn status 999.',
      )
    }
    throw createError(response.status, `Request failed with status ${response.status}.`)
  }

  const contentType = response.headers.get('content-type') ?? ''
  if (
    contentType &&
    !contentType.includes('text/html') &&
    !contentType.includes('application/xhtml+xml')
  ) {
    throw createError(415, 'Only HTML content can be scraped.')
  }

  const html = await response.text()
  const $ = load(html)
  $('script, style, noscript').remove()

  const baseUrl = response.url || parsedUrl.toString()
  const metadata = extractMetadata($, baseUrl)
  const text = extractText($, maxTextLength)
  const links = extractLinks($, baseUrl, maxLinks)
  const images = extractImages($, baseUrl, maxImages)

  return {
    url: baseUrl,
    contentType: contentType || null,
    ...metadata,
    text,
    links,
    images,
    ...(includeHtml ? { html } : {}),
  }
}

export const scraper = (inputUrl, options = {}) =>
  scrapeWebsite(inputUrl, options)

export default scraper
