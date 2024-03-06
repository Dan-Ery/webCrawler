const { argv } = require('node:process');
const { normalizeURL, getURLsFromHTML, crawlPage } = require('./crawl.js')

async function main(){
    if (argv.length !== 3) {
        throw new Error("")
    }
    baseUrl = argv[2]
    console.log(baseUrl)
    console.log(await crawlPage(baseUrl))
  }
  
  main()