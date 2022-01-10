import db from '$lib/db/sqlite';

let body;
export async function get(req) {
  const { params, query } = req;
  console.log(query.get('some'))
  if (params.operation in operations)
    await operations[params.operation]();
  return  { body }
}

const operations = {
  create: async() => {
    body = await db.prepare(`CREATE TABLE test (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNICUE NOT NULL
    )`).run();
  },
  insert: async () => {
    body = await db.prepare('INSERT INTO test(name) VALUES (?), (?), (?)').run('Paul', 'Love', 'Anna');
  },
  select: async () => {
    body = await db.prepare('SELECT * FROM test').get();
  }
}


