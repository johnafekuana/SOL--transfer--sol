import * as dotenv from 'dotenv';
dotenv.config();

import { getKeypairFromEnvironment } from '@solana-developers/helpers';

try {
    const keypair = getKeypairFromEnvironment("SECRET_KEY");
    console.log(`Secret key loaded successfully from .env`);
} catch (error) {
    console.error(`Error loading secret key: ${error.message}`);
}