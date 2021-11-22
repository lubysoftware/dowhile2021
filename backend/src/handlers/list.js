const ThingModel = require("../models/things")
const { thingTypes } = require("../enums")
const { httpResponse } = require("../helpers")

/**
 * @param {import('aws-lambda').APIGatewayProxyEvent} event
 * @returns {Promise<import('aws-lambda').APIGatewayProxyResult>}
 */
exports.handler = async function(event) {
  console.log("event: ", event)
  try {
    const result = await ThingModel.query('type').eq(thingTypes.sensor).all().exec()
    return httpResponse.ok(result)
  } catch (error) {
    console.error(`Error: ${JSON.stringify(error)}`)
    return httpResponse.internalServerError()
  }
}
