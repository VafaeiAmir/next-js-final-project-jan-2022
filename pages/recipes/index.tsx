import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../../components/Layout';
import { getParsedCookie, setParsedCookie } from '../../util/cookies';
import {
  getRecipes,
  getUserByValidSessionToken,
  Recipe,
} from '../../util/database';
import styles from './recipes.module.css';

type UserObject = {
  id: number;
  username: string;
};
type Props = {
  recipes: Recipe[];
  likedRecipes: string[];
  userObject: UserObject;
};

export default function Recipes(props: Props) {
  const [likedArray, setLikedArray] = useState(props.likedRecipes);

  function toggleRecipeLike(id: number) {
    // 1. get the value of the cookie
    const cookieValue = getParsedCookie('likedRecipes') || [];

    // 2. update the cooke
    const existIdOnArray = cookieValue.some((cookieObject: string) => {
      return cookieObject.id === id;
    });

    let newCookie;
    if (existIdOnArray) {
      //  CASE = when the id is in the array => delete item
      //  cookieValue  [{id:3},{id:5} ]
      newCookie = cookieValue.filter((cookieObject: string) => {
        return cookieObject.id !== id;
      });
    } else {
      //  CASE = when the id is not in the array => add item
      //  cookieValue  [{id:3, stars: 5 },{id:5, stars: 12 }]
      newCookie = [...cookieValue, { id: id, stars: 0 }];
    }

    // 3. set the new value of the cookie
    setLikedArray(newCookie);
    setParsedCookie('likedRecipes', newCookie);
  }

  return (
    <Layout userObject={props.userObject}>
      <Head>
        <title>Recipes</title>
        <meta name="description" content="A list of Recipes" />
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
          const recipeIsLiked = likedArray.some((likedObject: string) => {
            return likedObject.id === recipe.id;
          });
          return (
            <div
              key={`recipe-${recipe.id}`}
              data-test-id={`recipes-page-recipe-${recipe.id}`}
              className={styles.recipeText}
            >
              <Link href={`/recipes/${recipe.id}`}>
                <a>
                  <h1>{recipe.name}</h1>
                  <a>{recipe.text}</a>
                </a>
              </Link>
              <div className={styles.likeButton}>
                <button onClick={() => toggleRecipeLike(recipe.id)}>
                  {recipeIsLiked ? '😍' : '🤔'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
// every code from here will run in Node.js
// Connect to database
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken;
  const user = await getUserByValidSessionToken(token);
  if (!user) {
    return {
      redirect: {
        destination: `/login?returnTo=/recipes`,
        permanent: false,
      },
    };
  }
  // 1. get the cookies from the browser
  // 2. pass the cookies to the frontend
  const likedRecipesFromCookies = context.req.cookies.likedRecipes || '[]';
  // if there is no likedAnimals cookie on the browser we store to an [] otherwise we get the cooke value and parse it
  const likedRecipes = JSON.parse(likedRecipesFromCookies);

  const recipes = await getRecipes();

  return {
    props: { recipes: recipes, likedRecipes: likedRecipes },
  };
}
