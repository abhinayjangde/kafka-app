const {kafka} = require("./client");
const group = process.argv[2]

async function init(){
    const consumer = kafka.consumer({groupId: group})
    console.log("Consumer connecting....")
    await consumer.connect()
    console.log("Consumer connected....")
    await consumer.subscribe({topic: 'rider-updates', fromBeginning: true})
    await consumer.run({
        eachMessage: async ({topic, partition, message}) => {
            console.log(`${group} : [${topic}]: PART:${partition} Rider: ${message.key.toString()} Location: ${message.value.toString()}`)
        }
    })

}

init()