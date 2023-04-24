import pgPromise from 'pg-promise';
import dbConfig from './configs/db.config.json';

const promise = pgPromise();
const  connectionURL = `${dbConfig.dbName}://${dbConfig.user}:${dbConfig.password}@${dbConfig.url}:${dbConfig.port}/${dbConfig.db}`;
export const db = promise(connectionURL);