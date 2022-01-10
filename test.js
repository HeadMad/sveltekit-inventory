import sqlite3 from 'better-sqlite3';

const db = sqlite3('test.sql');


// const create = db.prepare('CREATE TABLE table1 (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE)').run();
// console.log('Create: ', create);
const insert = db.prepare('INSERT INTO table1 (name) VALUES (?)').run('Lena');
// const insertNmaes = db.transaction((names) => {
//   for (let name of names)
//     insert.run(name);
// });

// const res = insertNmaes(['Anna', 'Love', 'Dana', 'Pavel']);
console.log('Inser Names: ', insert);