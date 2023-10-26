import * as dotenv from 'dotenv'
import { Pool } from 'pg';

dotenv.config();

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_TEST_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    ENV,
} = process.env;

console.log('Environment is currently running in ' + ENV + " mode...");

let client = new Pool();


if (ENV === 'dev' || ENV === 'console') {
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    });
} else if (ENV === 'test') {

    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_TEST_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    });
} else {
    throw new Error(`Invalid ENV value: ${ENV}`);
}

export default client;