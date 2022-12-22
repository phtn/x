// const web3 = require('@solana/web3.js')
import * as web3 from '@solana/web3.js'

const PROGRAM_ADDRESS = 'ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa'
const PROGRAM_DATA_ADDRESS = 'Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod'

const generateKeypair = async (setSecret: Function, setPub: Function) => {
    const newKeypair = await web3.Keypair.generate()
    setSecret(newKeypair.secretKey)
    setPub(newKeypair.publicKey)
}
const initializeKeypair = (uintSecret: any) => {
    // const x = JSON.parse(KEY)
    // console.log(x)
    // const secret = JSON.parse(uintSecret ?? "")
    // console.log(uintSecret)
    // const secretKey = Uint8Array.from(x)
    // console.log(secretKey)
    const keypairFromSecretKey = web3.Keypair.fromSecretKey(uintSecret)
    return keypairFromSecretKey
}
const getSol = async (uintSecret: any, setStatus: Function) => {
    setStatus("processing")
    const payer = initializeKeypair(uintSecret)
    const connection = new web3.Connection(web3.clusterApiUrl('devnet'))
    await connection.requestAirdrop(payer.publicKey, web3.LAMPORTS_PER_SOL * 1)
    setStatus("success")
}

const sendSol = async (uintSecret: any, setStatus: Function, setLink: Function) => {
    setStatus('sending')
    const payer = initializeKeypair(uintSecret)
    const connection = new web3.Connection(web3.clusterApiUrl('devnet'))
    await pingProgram(connection, payer, setStatus, setLink)

}


async function pingProgram(connection: web3.Connection, payer: web3.Keypair, setStatus: Function, setLink: Function) {
    const transaction = new web3.Transaction()

    const programId = new web3.PublicKey(PROGRAM_ADDRESS)
    const programDataPubkey = new web3.PublicKey(PROGRAM_DATA_ADDRESS)


    const instruction = new web3.TransactionInstruction({
        keys: [
            {
                pubkey: programDataPubkey,
                isSigner: false,
                isWritable: true
            },
        ],
        programId
    })

    transaction.add(instruction)

    const sig = await web3.sendAndConfirmTransaction(
        connection,
        transaction,
        [payer]
    )
    setStatus('sent')
    setLink(`https://explorer.solana.com/tx/${sig}?cluster=devnet`)

    // console.log(`You can view your transaction on the Solana Explorer at:\nhttps://explorer.solana.com/tx/${sig}?cluster=devnet`)
}

export { generateKeypair, getSol, sendSol }

