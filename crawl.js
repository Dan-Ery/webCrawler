const { JSDOM } = require('jsdom')

function normalizeURL(unNormalizedUrlString) {
    let urlObj = new URL(unNormalizedUrlString)
    let normalizedUrlString = `${urlObj.host}${urlObj.pathname}`
    if (normalizedUrlString.length > 0 && normalizedUrlString.endsWith('/')){
        normalizedUrlString = normalizedUrlString.slice(0, -1)
    }
    return normalizedUrlString
}

function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody)
    const acnhorsArray = dom.window.document.querySelectorAll('a')
    const absoluteURLs = []
    for (let anchor of acnhorsArray) {
        let aHref = anchor.href
        let absoluteURL
        try {
            if (aHref.startsWith('/')) {
                absoluteURL = new URL(aHref, baseURL).href
            } else {
                absoluteURL = new URL(aHref).href
            }
            absoluteURLs.push(absoluteURL)
        } catch (err) {
            console.log(`${err.message}: ${aHref}`)
        }
    }
    return absoluteURLs
}

module.exports = {
    normalizeURL, getURLsFromHTML
}