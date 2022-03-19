import camelcaseKeys from 'camelcase-keys';
import { config } from 'dotenv-safe';
// import { Session } from 'inspector';
import postgres from 'postgres';
// import Recipes from '../pages/recipes';
import setPostgresDefaultsOnHeroku from './setPostgresDefaultOnHeroku.js';

setPostgresDefaultsOnHeroku();

config();
// const sql = postgres();
declare module globalThis {
  let postgresSqlClient: ReturnType<typeof postgres> | undefined;
}
// Connect only once to the database

function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
    sql = postgres();
    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    if (!globalThis.postgresSqlClient) {
      globalThis.postgresSqlClient = postgres();
    }
    sql = globalThis.postgresSqlClient;
  }
  return sql;
}
// Connect to postgreSQL
const sql = connectOneTimeToDatabase();

export type Recipe = {
  id: number;
  name: string;
  ingredients: string;
  text: string;
};

export async function getRecipes() {
  const recipes = await sql<Recipe[]>`
SELECT * FROM recipes;
`;
  return recipes.map((recipe) => camelcaseKeys(recipe));
}

export async function getRecipeById(id: number) {
  const [recipe] = await sql<[Recipe | undefined]>`
  SELECT * FROM recipes WHERE id = ${id};
  `;
  return recipe && camelcaseKeys(recipe);
}

// console.log('recipes', recipes);

// const recipesDatabase = [
//   {
//     id: '1',
//     name: 'Tahchin',
//     text: 'Portions: 4, Prep Time: 20 Minutes, Cooking Time: 1 Hour 30 Minutes',
//     ingredients:
//       '.2 cups basmati rice .2 eggs .1/2 cup dried barberries .1/2 cup plain yogurt .2 tablespoon .butter .1/4 cup oil .4 tablespoon bloomed saffron .Salt and pepper .1 boneless chicken breast .1 onion .Turmeric .2 tablespoon slivered almonds(optional) .2 tablespoon slivered pistachios(optional)',
//   },
//   {
//     id: '2',
//     name: 'Lubia Polo',
//     text: 'Portions: 4, Prep Time: 20 Minutes, Cooking Time: 1 Hour 10 Minutes',
//     ingredients:
//       '.1 pound ground beef .1 large onion, chopped .1 jalapeno pepper, finely chopped .2 tablespoons curry powder .5 cups chicken broth .1 cup tomato sauce .1 pound fresh green beans, cut into 1 inch pieces .3 cups uncooked basmati rice, rinsed and drained .3 tablespoons vegetable oil',
//   },
//   {
//     id: '3',
//     name: 'Sabzi Polo',
//     text: 'Portions: 4, Prep Time: 35 Minutes, Cooking Time: 1 Hour 20 Minutes',
//     ingredients:
//       '2 ½ cups long-grain basmati rice .kosher salt, divided .¼ teaspoon saffron threads .2 tablespoons boiling water .1 large bunch finely chopped fresh parsley .1 large bunch finely chopped fresh cilantro .1 large bunch finely chopped fresh dill .1 large bunch finely chopped fresh chives .¼ cup dried dill, finely chopped .¼ cup grapeseed oil .1 sheet lavash bread, or as needed .2 fresh spring garlic stalks (Optional) .¼ cup boiling water .3 tablespoons unsalted butter, melted ',
//   },
//   {
//     id: '4',
//     name: 'Baghali Polo',
//     text: 'Portions: 4, Prep Time: 40 Minutes, Cooking Time: 1 Hour',
//     ingredients:
//       '3 cups rice .300gr of lamb shanks .3 tablespoon Dried dill .1 cup green lima Beans .1 big onion .2 tablespoon bloomed saffron .Salt, pepper and turmeric .Oil',
//   },
// ];
// export default recipesDatabase;

// export async function getUser() {
//   const user = await sql`
//   INSERT INTO Users ${sql(user, 'username', 'password_hash')}
//   `;
//   return user;
// }

export type User = {
  id: number;
  username: string;
};

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

export async function getUserById(id: number) {
  const [user] = await sql<[User | undefined]>`
    SELECT
      id,
      username
    FROM
      users
    WHERE
      id = ${id}
  `;
  return user && camelcaseKeys(user);
}

export async function getUserByValidSessionToken(token: string | undefined) {
  if (!token) return undefined;
  const [user] = await sql<[User | undefined]>`
    SELECT
      users.id,
      users.username
    FROM
      users,
      sessions
    WHERE
      sessions.token = ${token} AND
      sessions.user_id = users.id AND
      sessions.expiry_timestamp > now()
  `;
  return user && camelcaseKeys(user);
}

export async function getUserByUsername(username: string) {
  const [user] = await sql<[{ id: number } | undefined]>`
    SELECT id FROM users WHERE username = ${username}
  `;
  return user && camelcaseKeys(user);
}

export async function getUserWithPasswordHashByUsername(username: string) {
  const [user] = await sql<[UserWithPasswordHash | undefined]>`
    SELECT
      id,
      username,
      password_hash
    FROM
      users
    WHERE
      username = ${username}
  `;
  return user && camelcaseKeys(user);
}

export async function createUser(username: string, passwordHash: string) {
  const [user] = await sql<[User]>`
    INSERT INTO users
      (username, password_hash)
    VALUES
      (${username}, ${passwordHash})
    RETURNING
      id,
      username
  `;
  return camelcaseKeys(user);
}

type Session = {
  id: number;
  token: string;
  userId: number;
};

export async function getValidSessionByToken(token: string | undefined) {
  if (!token) return undefined;
  const [session] = await sql<[Session | undefined]>`
    SELECT
      *
    FROM
      sessions
    WHERE
      token = ${token} AND
      expiry_timestamp > now()
  `;

  await deleteExpiredSessions();

  return session && camelcaseKeys(session);
}

export async function createSession(token: string, userId: number) {
  const [session] = await sql<[Session]>`
    INSERT INTO sessions
      (token, user_id)
    VALUES
      (${token}, ${userId})
    RETURNING
      id,
      token
  `;

  await deleteExpiredSessions();

  return camelcaseKeys(session);
}

export async function deleteSessionByToken(token: string) {
  const [session] = await sql<[Session | undefined]>`
    DELETE FROM
      sessions
    WHERE
      token = ${token}
    RETURNING *
  `;
  return session && camelcaseKeys(session);
}

export async function deleteExpiredSessions() {
  const sessions = await sql<Session[]>`
    DELETE FROM
      sessions
    WHERE
      expiry_timestamp < NOW()
    RETURNING *
  `;

  return sessions.map((session) => camelcaseKeys(session));
}
export type Comment = {
  id: number;
  recipeId: number;
  userId: number;
};

export async function createComment(
  comment: string,
  userId: number,
  recipeId: number,
) {
  const [commentId] = await sql<[Comment]>`
    INSERT INTO comments
      (comment, user_id, recipe_id)
    VALUES
      (${comment}, ${userId}, ${recipeId} )
    RETURNING
     id,
     comment,
     user_id,
     recipe_id
  `;
  return camelcaseKeys(commentId);
}

export async function getCommentByRecipeId(id: number) {
  const comments = await sql<[Comment]>`
  SELECT
   *
  FROM
    comments
  WHERE
    recipe_id = ${id}
`;
  return comments;
  // return comments.map((comment) => {
  //   return camelcaseKeys(comment);
  // });
}
