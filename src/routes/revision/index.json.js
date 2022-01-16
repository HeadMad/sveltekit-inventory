import db from '$lib/sqlite/tempDb';

const sql = `CREATETABLE table2 (
  id INT PRIMARY KEY AUTOINCREMENT NOT NULL,
  name TEXT NOT NULL,
  surname TEXT NOT NULL,
  age INT NOT NULL,
  address TEXT NOT NULL
  ); `
  


