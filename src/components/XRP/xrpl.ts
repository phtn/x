import xrpl from 'xrpl'

async function main() {

    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
    await client.connect()
  
    // ... custom code goes here
  
    client.disconnect()
  }
  
  main()