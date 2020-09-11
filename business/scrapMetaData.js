const ogs = require('open-graph-scraper');
const _ = require('lodash');
module.exports = scrapMetaData;

/**
 * Used to fetch Og tags and return response.
 * @param url A site for which Og tags is required.
 * @returns Og tags or error if URL is incorrect
 */
async function scrapMetaData(url = ''){
    try{
        const options = { url: url };
        const result   =   await ogs(options);
        console.log("Result from OGS ",result)
        let response  = {};
        // response.title = _.get(result,'data.ogTitle');
        response.title = _.get(result, 'data.ogTitle');
        response.description = _.get(result,'data.ogDescription');
        response.images  = [];
        if(!_.isEmpty(result.data.ogImage.url)){
            response.images = [result.data.ogImage.url];
        }
        
        // Redis can be used here to cache content for 8 hours
        // Akamai can also be used to cache content for 8 hours
        return response;
    }catch(error){
        console.log("Error from ogs",error);
        throw error;
    }  
}