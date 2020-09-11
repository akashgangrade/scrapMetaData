const supertest = require('supertest');
const chai = require('chai');
const _  = require('lodash');

const api = supertest('https://meta-data-scrapper.herokuapp.com');

module.exports = {
    initRequests,
    post,
    errorCases
}

function initRequests(testData) {
    let successRequest, errorResponse, errorRequests, accessToken;
    successRequest = testData['requests'][0];
    errorResponse = _.reduce(testData['error'], (res, val, key) => {
        res['codes'].push(val.response.code);
        res[val.response.code] = val.response.message;
        return res;
    }, { codes: [] });
    errorRequests = testData['error'];
    return {
        "successRequest": successRequest,
        "errorResponse": errorResponse,
        "errorRequests": errorRequests
    };
}

async function post(url, data, headers = {}) {
    let response = await api.post(url).send(data).set(headers);
    return response.body;
};

 async function errorCases(endPoint = '', method = 'post', errorRequests = []) {
    // errorRequests = _.takeRight(errorRequests, 1)
    for (let j = 0; j < errorRequests.length; j++) {
        let
            errorReqforCode = errorRequests[j].requests,
            errorResforCode = errorRequests[j].response;

        // dev purpose only
        // errorReqforCode = _.takeRight(errorReqforCode, 1)
        ;
        for (let i = 0; i < errorReqforCode.length; i++) {
            it(`Negative case invalid request\nstatus code ===> ${errorRequests[j].code} subCode ==> ${errorResforCode.code} message => ` + _.get(errorReqforCode[i], 'description', ''), async () => {
                // Now based on codes, please change the body, accessToken etc
                const headers = _.get(errorReqforCode[i], 'headers', {});

                // remove headers and description key from data
                _.unset(errorReqforCode[i], 'headers');
                _.unset(errorReqforCode[i], 'description');

                let res = await post(endPoint, errorReqforCode[i], headers);
                chai.expect(res).to.be.an('object');
                // console.log(errorReqforCode[i], res)
                // chai.expect(res).to.haveOwnProperty(');
                chai.expect(res.code).to.be.equal(errorResforCode.code);
                // console.log(res.message)
                chai.expect(res.message).to.be.equal(errorResforCode.message);
            });
        }
    }

}