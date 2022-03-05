CREATE TABLE recipes(
id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
name varchar(100) NOT NULL,
text varchar(100) NOT NULL,
ingredients varchar(600) NOT NULL
);

--inserting some recipes (C in CRUD - Creat)
INSERT INTO recipes
  (name, text, ingredients)
  VALUES
  ('Tahchin', 'Portions: 4, Prep Time: 20 Minutes, Cooking Time: 1 Hour 30 Minutes', '.2 cups basmati rice .2 eggs .1/2 cup dried barberries .1/2 cup plain yogurt .2 tablespoon .butter .1/4 cup oil .4 tablespoon bloomed saffron .Salt and pepper .1 boneless chicken breast .1 onion .Turmeric .2 tablespoon slivered almonds(optional) .2 tablespoon slivered pistachios(optional)'),
  ('Lubia Polo', 'Portions: 4, Prep Time: 20 Minutes, Cooking Time: 1 Hour 10 Minutes', '.1 pound ground beef .1 large onion, chopped .1 jalapeno pepper, finely chopped .2 tablespoons curry powder .5 cups chicken broth .1 cup tomato sauce .1 pound fresh green beans, cut into 1 inch pieces .3 cups uncooked basmati rice, rinsed and drained .3 tablespoons vegetable oil'),
  ('Sabzi Polo', 'Portions: 4, Prep Time: 35 Minutes, Cooking Time: 1 Hour 20 Minutes', '2 ½ cups long-grain basmati rice .kosher salt, divided .¼ teaspoon saffron threads .2 tablespoons boiling water .1 large bunch finely chopped fresh parsley .1 large bunch finely chopped fresh cilantro .1 large bunch finely chopped fresh dill .1 large bunch finely chopped fresh chives .¼ cup dried dill, finely chopped .¼ cup grapeseed oil .1 sheet lavash bread, or as needed .2 fresh spring garlic stalks (Optional) .¼ cup boiling water .3 tablespoons unsalted butter, melted '),
  ('Baghali Polo', 'Portions: 4, Prep Time: 40 Minutes, Cooking Time: 1 Hour', '3 cups rice .300gr of lamb shanks .3 tablespoon Dried dill .1 cup green lima Beans .1 big onion .2 tablespoon bloomed saffron .Salt, pepper and turmeric .Oil');

  --Read some recipes
  SELECT * FROM recipes;