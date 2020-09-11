const Joi = require("joi");
const getMetaDataBusiness = require('./../business/scrapMetaData');
const validate = require('./../validations/scrapMetaData');

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
        const { error } = validate(input);
        if (error) {
            console.log("\n Error in validation \n",error)
            return response.status(400).send({'message':"Please provide a URL",
            'code': 1
           });
          }
        // Fetch Meta Data
        const result = await getMetaDataBusiness(input.url);
        return response.status(200).send(result);
    }catch(error){

        console.log("Error in API",error)
        if(error.error === 'Page Not Found' || error.error == 'Time Out'){
            // Response message and status can be fetched from config
            return response.status(400).send({'message':"The URL provided is invalid",
            'code': 2    
           });    
        }
        // If any unexpected error occur then return 500
        return response.status(500).send(
            {'message':"There was an error",
             'code': 3   
            });
    }
}
