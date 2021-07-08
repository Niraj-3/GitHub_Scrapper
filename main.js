const cheerio = require('cheerio');
const request = require('request');
const {getRepos} = require('./repos')


const url = 'https://github.com/topics';

request(url,cb);

function cb(err,response,html){
    if(err){
        console.log(err)
    }else{
        extractTopics(html)
    }
}

function extractTopics(html){
    const $ = cheerio.load(html);
    let topicsArr = $('.col-12.col-sm-6.col-md-4.mb-4')
    for(let i=0;i<topicsArr.length;i++){
        let topicsLink = $(topicsArr[i]).find('a').attr('href');
        let topic = topicsLink.split('/').pop()
        let fullLink  = 'https://github.com' + topicsLink;
        console.log(fullLink);
        getRepos(fullLink,topic);
    }
}
