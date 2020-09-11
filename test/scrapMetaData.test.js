'use strict';
const chai = require('chai');
const _  = require('lodash');
const testData  = require('./models/scrapMetaData.json')    ; 
const utils = require('./utils');

let {successRequest, errorResponse, errorRequests} = utils.initRequests(testData);
let accessToken;


describe('Check Scrap Meta Data API  ', async() => {    
  before(async () => {
        // test data 
    });
    after(async () => {
        console.log('Check Scrap Meta Data completed');
       
    });

    describe('System  will able to get the Meta Data', async () => {
       it('Positive case with valid URL', async () => {
           
            let res = await utils.post('/scrapMetaData', successRequest);
            chai.expect(res).to.be.an('object');  
            chai.expect(res).to.haveOwnProperty('title');
            chai.expect(res).to.haveOwnProperty('description');
            chai.expect(res).to.haveOwnProperty('images');
        });
    });

    describe('Negative cases with invalid request / data', async () => {utils.errorCases('/scrapMetaData ', 'post', errorRequests)});

});
