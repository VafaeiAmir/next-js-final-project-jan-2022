CREATE TABLE recipes(
id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
name varchar(100) NOT NULL,
text integer NOT NULL,
ingredients integer NOT NULL
);

--inserting some recipes (C in CRUD - Creat)
INSERT INTO recipes
  (name, text, ingredients)
  VALUES
  ('Tahchin', 'Portions: 4, Prep Time: 20 Minutes, Cooking Time: 1 Hour 30 Minutes', '.2 cups basmati rice .2 eggs .1/2 cup dried barberries .1/2 cup plain yogurt .2 tablespoon .butter .1/4 cup oil .4 tablespoon bloomed saffron .Salt and pepper .1 boneless chicken breast .1 onion .Turmeric .2 tablespoon slivered almonds .2 tablespoon slivered pistachios'),
  ('Lubia Polo', 'Portions: 4, Prep Time: 20 Minutes, Cooking Time: 1 Hour 10 Minutes', '.1 pound ground beef .1 large onion, chopped .1 jalapeno pepper, finely chopped .2 tablespoons curry powder .5 cups chicken broth .1 cup tomato sauce .1 pound fresh green beans, cut into 1 inch pieces .3 cups uncooked basmati rice, rinsed and drained .3 tablespoons vegetable oil'),
  ('Sabzi Polo', 'Portions: 4, Prep Time: 35 Minutes, Cooking Time: 1 Hour 20 Minutes', '.1 pound ground beef .1 large onion, chopped .1 jalapeno pepper, finely chopped .2 tablespoons curry powder .5 cups chicken broth .1 cup tomato sauce .1 pound fresh green beans, cut into 1 inch pieces .3 cups uncooked basmati rice, rinsed and drained .3 tablespoons vegetable oil'),
  ('Baghali Polo', 'Portions: 4, Prep Time: 40 Minutes, Cooking Time: 1 Hour', '.1 pound ground beef .1 large onion, chopped .1 jalapeno pepper, finely chopped .2 tablespoons curry powder .5 cups chicken broth .1 cup tomato sauce .1 pound fresh green beans, cut into 1 inch pieces .3 cups uncooked basmati rice, rinsed and drained .3 tablespoons vegetable oil')

  --Read some recipes
  SELECT * FROM recipes;