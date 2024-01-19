import { Keypair } from "@solana/web3.js";
import * as dotenv from 'dotenv';
dotenv.config();

const secretKeyArray = JSON.parse(process.env.SECRET_KEY as string);

try {
    if (!secretKeyArray || secretKeyArray.length !== 64) {
        throw new Error("Invalid secret key size");
    }

    // Convert the secret key array to Uint8Array
    const secretKeyUint8Array = new Uint8Array(secretKeyArray);

    // Create a keypair from the secret key
    const keypair = Keypair.fromSecretKey(secretKeyUint8Array);

    console.log(`Secret key loaded successfully from .env`);
    // Now 'keypair' contains the loaded keypair, and you can use it in your code.
} catch (error) {
    console.error(`Error loading secret key: ${error.message}`);
}


