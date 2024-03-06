function normalizeURL(unNormalizedUrlString) {
    let urlObj = new URL(unNormalizedUrlString)
    let normalizedUrlString = `${urlObj.host}${urlObj.pathname}`
    if (normalizedUrlString.length > 0 && normalizedUrlString.endsWith('/')){
        normalizedUrlString = normalizedUrlString.slice(0, -1)
    }
    return normalizedUrlString
}

module.exports = {
    normalizeURL
}