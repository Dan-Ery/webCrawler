function printReport(pages) {
    console.log('Printing Report . . .')
    // Sort the pages so that pages with the largest number of inbound internal links are first
    let sortedPages = sortPages(pages)
    // Print each page in the format `Found ${count} internal links to ${url}`
    for (let page of sortedPages) {
        console.log(`Found ${page[0]} internal links to ${page[1]}`)
    }
}

/**
 * Given a pages obj, return a sorted list of page counts
 * @param {*} pages 
 */
function sortPages(pages) {    
    let sortedCounts = [];
    for (var pageURL in pages) {
        sortedCounts.push([pageURL, pages[pageURL]]);
    }

    sortedCounts.sort(function(a, b) {
        return b[1] - a[1];
    });

    return sortedCounts
}

module.exports = {
    printReport
}