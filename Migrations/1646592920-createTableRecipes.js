exports.up = async (sql) => {
  await sql`
	  CREATE TABLE recipes(
  	id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  	name varchar(100) NOT NULL,
  	text varchar(100) NOT NULL,
  	ingredients varchar(600) NOT NULL
  	);
	`;
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE recipes
	`;
};
