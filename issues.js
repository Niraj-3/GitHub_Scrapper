const cheerio = require('cheerio')
const request = require('request')
const fs = require('fs');
const path = require('path');
const pdfDocument = require('pdfkit');

function getIssues(fullLink,topic,repoName){
    request(fullLink,cb);
    function cb(err,response,html){
        if(err){
            console.log(err)
        }else{
            extractIssues(html,topic,repoName);
        }
    }
}

function extractIssues(html,topic,repoName){
    let issues=[]
    const $ = cheerio.load(html)
    const issuesArr = $('.Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title')
    for(let i=0;i<issuesArr.length;i++){
        let issueLink = $(issuesArr[i]).attr('href')
        let fullLink = 'https://github.com' + issueLink
        issues.push(fullLink)
    }
    // console.log(issues)
    organize(topic,repoName,issues)
}

function organize(topic,repoName,issues){
    let topicPath = path.join(__dirname,topic)
    dirCreator(topicPath)
    let repoPath = path.join(topicPath,repoName+'.pdf')
    let content = JSON.stringify(issues)
    let pdfDoc = new pdfDocument;
    pdfDoc.pipe(fs.createWriteStream(repoPath))
    pdfDoc.text(content)
    pdfDoc.end()
}

function dirCreator(dirPath){
    if(fs.existsSync(dirPath)==false){
        fs.mkdirSync(dirPath)
    }
}

module.exports = {
    getIssues
}