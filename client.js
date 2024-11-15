
const {Kafka} = require('kafkajs')
process.loadEnvFile()
exports.kafka = new Kafka({
    clientId: 'my-app',
    brokers: [process.env.KAFKA_BROKER]
})