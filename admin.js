const {kafka} = require('./client');

async function init(){
    const admin = kafka.admin();
    console.log("Admin connecting....")
    await admin.connect();
    console.log("Admin connected....")

    // Create Topic
    console.log("Creating Topic...")
    await admin.createTopics({
        topics: [{
            topic: 'rider-updates',
            numPartitions: 2
        }]
    })
    console.log("Topic created...")
    console.log("Admin disconnecting....")
    await admin.disconnect();
}

init()