import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { getRecipes } from '../../util/database';
import { Recipe } from './[recipeId]';
import styles from './recipes.module.css';

type Props = {
  recipes: Recipe[];
};

export default function Recipes(props: Props) {
  return (
    <Layout>
      <Head>
        <title>Recipes</title>
        <meta name="description" content="Recipes" />
      </Head>
      <h1 className={styles.downText}>Recipes & Pictures</h1>

      <div className={styles.recipesImage}>
        <Image
          src="/home-pics/1.jpg"
          alt="a picture of Tahchin"
          width={300}
          height={200}
        />
        <Image
          src="/home-pics/2.jpg"
          alt="a picture of Lubia Polo"
          width={300}
          height={200}
        />
        <Image
          src="/home-pics/3.jpg"
          alt="a picture of Sabzi Polo"
          width={300}
          height={200}
        />
        <Image
          src="/home-pics/4.jpg"
          alt="a picture of Baghali Polo"
          width={300}
          height={200}
        />
      </div>
      <div className={styles.mainName}>
        {props.recipes.map((recipe) => {
          return (
            <div key={`recipe-${recipe.id}`} className={styles.recipeText}>
              <Link href={`/recipes/${recipe.id}`}>
                <a>
                  <h1>{recipe.name}</h1>
                  <a>{recipe.text}</a>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
// every code from here will run in Node.js
// Connect to database
export async function getServerSideProps() {
  const recipes = await getRecipes();

  return {
    props: { recipes: recipes },
  };
}
