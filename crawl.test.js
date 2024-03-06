const { test, expect, describe } = require('@jest/globals')
const { normalizeURL, getURLsFromHTML } = require('./crawl.js')

const expectedNormalizedURL = 'blog.boot.dev/path'
describe('normalizer', () => {
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
})

describe ('Url crawler', () => {
    test('', () => {
        inputHTML = `<html><body><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a></body></html>`
        expect(getURLsFromHTML(inputHTML, '')).toEqual(['https://blog.boot.dev/'])
    })
})