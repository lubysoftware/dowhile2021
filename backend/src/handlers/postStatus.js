const ThingModel = require("../models/things")
const IotService = require("../services/iot")
const { statuses, thingTypes } = require("../enums")
const { httpResponse } = require("../helpers")

/**
 * @param {import('aws-lambda').APIGatewayProxyEvent} event
 * @returns {Promise<import('aws-lambda').APIGatewayProxyResult>}
 */
exports.handler = async function(event) {
  console.log("event: ",event)
  try {
    const { clientId, status } = JSON.parse(event.body)
    if (!clientId || !Object.values(statuses).includes(status)) {
      return httpResponse.badRequest({
        error: 'Invalid data'
      })
    }

    await IotService.publish(`sensor/set-status/${clientId}`, { status })

    await ThingModel.update({
      type: thingTypes.sensor,
      clientId: clientId,
      status: status
    })

    return httpResponse.ok()
  } catch (error) {
    console.error(`Error: ${JSON.stringify(error)}`)
    return httpResponse.internalServerError()
  }
}
