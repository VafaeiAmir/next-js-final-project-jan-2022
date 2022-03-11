import { config } from 'dotenv-safe';
import postgres from 'postgres';

// This loads all environment variables from a .env file
// for all code after this line
config();

const sql = postgres();
// Old version, this would save the username and password in the code
// postgres('postgres://username:password@localhost:5432/database')

console.log(
  await sql`
    SELECT * FROM recipes;
  `,
);

// This is only for the example, in your code you will want
// a persistent connection to the database
sql.end();
