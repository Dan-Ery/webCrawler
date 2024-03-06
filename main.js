const { argv } = require('node:process');
const { normalizeURL, getURLsFromHTML, crawlPage } = require('./crawl.js')
const { printReport } = require('./report.js')

async function main(){
    if (argv.length !== 3) {
        throw new Error("")
    }
    baseUrl = argv[2]
    console.log(`Crawling on URL ${baseUrl}`)
    let pages = await crawlPage(baseUrl)
    console.log(pages)
    printReport(pages)

  }
  
  main()