
const Statuses = {
  active: 'active',
  inactive: 'inactive'
}

class Sensor {

  clientId = null
  
  interval = {
    id: null,
    value: 3000 // 3 segundos 
  }

  topicSubStatus = null

  topicPubTemperature = null
  
  /**
   * @type {import('aws-iot-device-sdk').device}
   */
  device = null

  constructor (clientId, device) {
    this.clientId = clientId
    this.device = device
    this.topicSubStatus = `sensor/set-status/${clientId}`
    this.topicPubTemperature = `sensor/set-temperature/${clientId}`
  }

  subscribeTopics() {
    this.device.subscribe(this.topicSubStatus)
    console.log('subscribe:', this.topicSubStatus)
  }

  receiveMessage(topic, payload) {
    payload = JSON.parse(payload)
    if (topic === this.topicSubStatus) {
      this.setStatus(payload)
    }
  }

  setStatus (data) {
    switch (data.status) {
      case Statuses.active:
        this.activateSensor()
        break;
      case Statuses.inactive:
        this.inactivateSensor()
        break;
    }
  }

  activateSensor () {
    if (this.interval.id) {
      return
    }
    this.interval.id = setInterval(() => this.publishTemperature(), this.interval.value)
    console.log('Sensor activated')
  }

  inactivateSensor () {
    clearInterval(this.interval.id)
    this.interval.id = null
    console.log('Sensor inactivated')
  }

  publishTemperature () {
    const data = {
      temperature: this.getTemperature()
    }
    this.device.publish(this.topicPubTemperature, JSON.stringify(data))
    console.log('publish:', this.topicPubTemperature, data.temperature)
  }

  getTemperature () {
    // random integer
    const min = 0, max = 50
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}

module.exports = Sensor
