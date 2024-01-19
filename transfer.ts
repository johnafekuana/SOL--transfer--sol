import {Keypair, PublicKey, Connection, Transaction, SystemProgram, sendAndConfirmTransaction, LAMPORTS_PER_SOL} from "@solana/web3.js"

import * as dotenv from 'dotenv';
dotenv.config();


try {
    //to load keypair from .env file
    const secretKeyArray = JSON.parse(process.env.SECRET_KEY as string);
    const secretKeyUint8Array = new Uint8Array(secretKeyArray);
    const SenderKeyPair = Keypair.fromSecretKey(secretKeyUint8Array);
    
    const suppliedPublicKey = process.argv[2] || null;

    if(!suppliedPublicKey){
        console.log(`Provide a valid public key to send SOL to!`);
        process.exit(1);
    }

    const toPubkey = new PublicKey(suppliedPublicKey);
    const connection = new Connection("https://api.devnet.solana.com", "confirmed"); //https://api.mainnet-beta.solana.com
    console.log(`Loaded our own keypair, the destination public key, and connected to Solana`);

    //creating a transaction
    const transaction = new Transaction();
    console.log(`Created transaction`);
    

    //a transfer Instruction
    const LAMPORTS_TO_SEND = 2000000;

    const sendSOL = SystemProgram.transfer({
        fromPubkey: SenderKeyPair.publicKey,
        toPubkey,
        lamports: LAMPORTS_TO_SEND
    })

    //adding instructions to our transaction
    transaction.add(sendSOL)
    console.log(`Instructions added`);
    

    //sending transaction
    const txHash = await sendAndConfirmTransaction(
        connection, transaction, [SenderKeyPair],
    );
    console.log(`You've sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}.`);

    const balanceInLamports = await connection.getBalance(toPubkey);
    const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
    console.log(`Your remaining balance is ${balanceInSOL} SOL`);
} catch (error) {
    console.error(`Error: ${error.message}`);
    console.error(error);
}



