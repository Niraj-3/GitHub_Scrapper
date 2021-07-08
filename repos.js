const cheerio = require('cheerio')
const request = require('request')
const {getIssues} = require('./issues');

function getRepos(fullLink,topic){
    request(fullLink,cb);
    function cb(err,response,html){
        if(err){
            console.log(err)
        }else{
            extractRepos(html,topic);
        }
    }
}

function extractRepos(html,topic){
    const $ = cheerio.load(html)
    const repoLinkArr = $('.border.rounded.color-shadow-small.color-bg-secondary.my-4 .d-flex.flex-auto').find('a');
    console.log(topic);
    for(let i=0;i<16;i++)
    {
        if($(repoLinkArr[i]).hasClass('text-bold')){
            let repoLink = $(repoLinkArr[i]).attr('href')
            console.log(repoLink)
            const repoName = repoLink.split('/').pop()
            let fullLink = 'https://github.com' + repoLink + "/issues";
            getIssues(fullLink,topic,repoName)
        }
    }
}

module.exports = {
    getRepos
}