const {kafka} = require('./client')
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

async function init(){
    const producer = kafka.producer()
    await producer.connect()
    rl.setPrompt('# ')
    rl.prompt()
    rl.on('line', async (line) => {
        const [riderName,location] = line.split(' ')
        await producer.send({
            topic: 'rider-updates',
            messages: [
                {   
                    partition: location === 'north' ? 0 : 1,
                    key: 'location-update',
                    value: JSON.stringify({name:riderName, location: location})
                }
            ],
        })
        
    }).on('close', async () => {
        await producer.disconnect()
    })
}

init()