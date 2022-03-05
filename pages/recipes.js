import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import { getRecipes } from '../util/database';

// import recipesDatabase, { readRecipes } from '../util/database';

const downTextStyle = css`
  text-align: center;
  font-size: 2.8rem;
  color: #660000;
`;
const recipesImageStyle = css`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(4, calc(((59vw - 4rem) / 3.5)));
  grid-gap: 2rem;
  grid-template-rows: auto;
  margin-left: 100px;
  margin-right: 100px;
  padding: 0 2rem 0;
`;
const mainNameStyle = css`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(4, calc(((59vw - 4rem) / 3.5)));
  grid-gap: 2rem;
  grid-template-rows: auto;
  margin-left: 130px;
  margin-right: 130px;
  padding: 0 2rem 0;
  color: #660000;
`;
const recipeTextStyle = css`
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
`;

export default function Recipes(props) {
  return (
    <Layout>
      <Head>
        <title>Recipes</title>
        <meta name="description" content="Recipes" />
      </Head>
      <h1 css={downTextStyle}>Recipes & Pictures</h1>

      <div css={recipesImageStyle}>
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
      <div css={mainNameStyle}>
        {props.recipes.map((recipe) => {
          return (
            <div key={`recipe-${recipe.id}`} css={recipeTextStyle}>
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
