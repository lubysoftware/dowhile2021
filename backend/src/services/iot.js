
const aws = require("aws-sdk")

class IotService {
  async getIotEndpoint() {
    if (!this.iotEndpointAddress) {
      const iot = new aws.Iot()
      const describe = await iot.describeEndpoint({}).promise()
      this.iotEndpointAddress = describe.endpointAddress
    }
    return this.iotEndpointAddress
  }

  async publish (topic, payload) {
    const iotData = new aws.IotData({
      endpoint: await this.getIotEndpoint()
    })
    const params = { 
      topic, 
      payload: JSON.stringify(payload)
    }
    const publishResult = await iotData.publish(params).promise()
    console.log(`Iot.publish - success: ${JSON.stringify(publishResult)}`)
  }
}

module.exports = new IotService()