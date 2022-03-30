import camelcaseKeys from 'camelcase-keys';
import { config } from 'dotenv-safe';
// import { Session } from 'inspector';
import postgres from 'postgres';
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

export type User = {
  id: number;
  username: string;
};
export type UserObject = {
  userObject?: User;
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

// Create Users

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
// Create session

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
  recipeId?: number;
  userId: number;
  comment?: string;
};

export async function createComment(
  comment: string,
  userId: number,
  recipeId: number,
  username: string,
) {
  const [commentId] = await sql<[Comment]>`
    INSERT INTO comments
      (comment, user_id, recipe_id, username)
    VALUES
      (${comment}, ${userId}, ${recipeId}, ${username} )
    RETURNING
     id,
     comment,
     user_id,
     recipe_id,
     username
  `;
  return camelcaseKeys(commentId);
}

export async function getCommentsByUserId(id: number) {
  const comments = await sql<[Comment[]]>`
  SELECT
   *
  FROM
    comments
  WHERE
    user_id = ${id}
`;
  return comments.map((comment) => camelcaseKeys(comment));
}

export async function getCommentByRecipeId(id: number) {
  const comment = await sql<[Comment]>`
  SELECT
   *
  FROM
    comments
  WHERE
    recipe_id = ${id}
`;
  return comment;
}

// export async function getCommentedRecipesByUserId(id: number) {
//   const comment = await sql<[Comment]>`
//   SELECT
//    *
//   FROM
//     comments,
//     recipes
//   WHERE
//     comments.recipe_id = ${id} AND
//     recipes.id = comments.recipe_id

// `;
//   return comment.map((comment) => camelcaseKeys(comment));
// }

export async function deleteCommentById(id: number) {
  const [deletedComment] = await sql<[Comment | undefined]>`
    DELETE FROM
      comments
    WHERE
     id = ${id}
    RETURNING *
  `;
  return deletedComment && camelcaseKeys(deletedComment);
}
