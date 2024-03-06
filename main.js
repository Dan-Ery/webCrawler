const { argv } = require('node:process');
const { normalizeURL, getURLsFromHTML } = require('./crawl.js')

function main(){
    if (argv.length !== 3) {
        throw new Error("")
    }
    baseUrl = argv[2]
    console.log(baseUrl)
  }
  
  main()