const { httpCodes } = require("./enums")

const httpResponse = {

  call: (httpCode, body) => {
    const response = {
      statusCode: httpCode,
      headers: {
        "Access-Control-Allow-Headers" : "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
      }
    }
    if (body) {
      response.body = JSON.stringify(body)
    }
    return response
  },

  ok: (body) => httpResponse.call(
    httpCodes.ok,
    body
  ),
  
  badRequest: (body) => httpResponse.call(
    httpCodes.badRequest,
    body
  ),
  
  internalServerError: () => httpResponse.call(
    httpCodes.internalServerError, 
    { error: 'Internal Server Error' }
  ),

}

exports.httpResponse = httpResponse
