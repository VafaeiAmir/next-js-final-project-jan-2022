exports.up = async (sql) => {
  await sql`
  CREATE TABLE comments (
		id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		comment varchar (600) NOT NULL,
		user_id integer REFERENCES users (id) ON DELETE CASCADE,
		recipe_id integer REFERENCES recipes (id) ON DELETE CASCADE
	);
	`;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE comments
  `;
};
