const dynamoose = require("dynamoose");

const tableName = "things"
const tableSchema = new dynamoose.Schema(
  {
    "type": {
      hashKey: true,
      type: String,
    },
    "clientId": {
      rangeKey: true,
      type: String,
    },
    "temperature": {
      type: Number,
    },
    "status": {
      type: String,
    }
  },
  {
    timestamps: true
  }
)
const tableOptions = {
  throughput: 'ON_DEMAND',
}

const ThingModel = dynamoose.model(tableName, tableSchema, tableOptions)
module.exports = ThingModel
