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

async function fetchPage(pageURLString) {
    url = new URL(pageURLString)
    let response = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        }
    });
    if (response.status >= 400) {
        console.log(`Page request for ${pageURL} failed: Status ${response.status}`)
        return
    }
    contentType = response.headers.get('content-type')
    if (!contentType.startsWith("text/html")) {
        console.log(`Page request for ${pageURLString} returned invalid content type: ${contentType}`)
        return
    }
    return await response.text()
}

async function crawlPage(baseURL, currentURL= baseURL, pages = {}) {
    if (new URL(baseURL).hostname != new URL(currentURL).hostname) {
        return pages
    }
    let normalizedURL = normalizeURL(currentURL)
    if (pages[normalizedURL]) {
        pages[normalizedURL]++
        return pages
    } else {
        pages[normalizedURL] = 1

        console.log(`Searching urls on ${normalizedURL} . . .`)
        pageHTML = await fetchPage(currentURL)
        linksInPage = getURLsFromHTML(pageHTML, baseURL)
        for (let link of linksInPage) {
            await crawlPage(baseURL, link, pages)
        }

        return pages
    }
}

module.exports = {
    normalizeURL, getURLsFromHTML, crawlPage
}