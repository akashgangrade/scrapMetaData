const Joi = require("joi");
const getMetaDataBusiness = require('./../business/scrapMetaData');

module.exports = scrapMetaData;
/**
 * Used to fetch Og tags and return response.
 * @param url A site for which Og tags is required.
 * @returns Og tags or error if URL is incorrect
 */
async function scrapMetaData(request, response)
{
    try{
        
        const input = request.body;
        console.log('Scrap API Input ', JSON.stringify(input));
        // Fetch Meta Data
        const result = await getMetaDataBusiness(input.url);
        return response.status(200).send(result);
    }catch(error){

        console.log("Error in API",error)
        if(error.error === 'Page Not Found'){
            // Response message and status can be fetched from config
            return response.status(400).send({'message':"The URL provided is invalid",
            'code': 1    
           });    
        }
        // If any unexpected error occur then return 500
        return response.status(500).send(
            {'message':"There was an error",
             'code': 2   
            });
    }
}
