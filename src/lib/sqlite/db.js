
import sqlite3 from 'better-sqlite3';

const db = sqlite3('./invent.sqlite3');
process.on('exit', () => db.close());
export default db;