const ThingModel = require("../models/things")
const { thingTypes, statuses } = require("../enums")

/**
 * @param {import('aws-lambda').IoTEvent} event
 * @returns 
 */
exports.handler = async function(event) {
  console.log("event: ", event)
  try {
    await ThingModel.update({
      type: thingTypes.sensor,
      clientId: event.clientId,
      temperature: event.temperature,
      status: statuses.active
    })
  } catch (error) {
    console.error(`Error: ${JSON.stringify(error)}`)
  }
}
