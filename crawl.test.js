const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')

const expectedNormalizedURL = 'blog.boot.dev/path'

test('trims https:// and trailing /', () => {
    expect(normalizeURL('https://blog.boot.dev/path/')).toBe(expectedNormalizedURL)
})

test('trims https://', () => {
    expect(normalizeURL('https://blog.boot.dev/path')).toBe(expectedNormalizedURL)
})

test('trims http:// and trailing /', () => {
    expect(normalizeURL('http://blog.boot.dev/path/')).toBe(expectedNormalizedURL)
})

test('trims http://', () => {
    expect(normalizeURL('http://blog.boot.dev/path')).toBe(expectedNormalizedURL)
})

test('Works with no path', () => {
    expect(normalizeURL('http://blog.boot.dev/')).toBe('blog.boot.dev')
})