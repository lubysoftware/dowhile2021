const awsIot = require('aws-iot-device-sdk')
const Sensor = require('./sensor')

const clientId = process.argv.slice(2)[0]
const iotAwsHost = 'a1syu8eq536v7e-ats.iot.us-east-2.amazonaws.com'

const device = awsIot.device({
  protocol: 'mqtts',
  host: iotAwsHost,
  clientId: clientId,
  keyPath: "certs/private.pem.key",
  certPath: "certs/certificate.pem.crt",
  caPath: "certs/root-CA.crt",
})

const sensor = new Sensor(clientId, device)

device
  .on('connect', function() {
    console.log('connect')
    sensor.activateSensor()
    sensor.subscribeTopics()
  })
  .on('message', function(topic, payload) {
    sensor.receiveMessage(topic, payload.toString())
  })
  .on('close', function() {
    console.log('close')
  })
  .on('reconnect', function() {
    console.log('reconnect')
  })
  .on('offline', function() {
     console.log('offline')
  })
  .on('error', function(error) {
     console.log('error', error)
  })