exports.up = async (sql) => {
  await sql`
	  CREATE TABLE userRecipes (
  	id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  	name varchar(100) NOT NULL,
  	text varchar(100) NOT NULL,
  	ingredients varchar(600) NOT NULL,
		user_id integer REFERENCES users (id) ON DELETE CASCADE
  	);
	`;
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE userRecipes
	`;
};
