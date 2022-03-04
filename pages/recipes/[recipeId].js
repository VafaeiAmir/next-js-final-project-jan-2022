import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../../components/Layout';
import recipesDatabase from '../../util/database';

const dynamicPageStyle = css`
  display: grid;
  justify-content: center;
  margin-left: 20px;
  margin-right: 20px;
`;
const ingredStyle = css`
  width: 250px;
`;

export default function SingleRecipe(props) {
  return (
    <Layout>
      <Head>
        <title>{props.recipe.name}</title>
        <meta
          discription={`${props.recipe.name} is a persian dish that can be cooked with rice`}
        />
      </Head>
      <div css={dynamicPageStyle}>
        <h1>{props.recipe.name}</h1>
        <Image
          src={`/home-pics/${props.recipe.id}.jpg`}
          width="400"
          height="270"
          alt="recipe picture"
        />

        <p>{props.recipe.text}</p>
        <p css={ingredStyle}>{props.recipe.ingredients}</p>
      </div>
    </Layout>
  );
}

export function getServerSideProps(context) {
  const recipeId = context.query.recipeId;
  const matchingRecipe = recipesDatabase.find((recipe) => {
    if (recipe.id === recipeId) {
      return true;
    } else {
      return false;
    }
  });
  return {
    props: {
      recipe: matchingRecipe,
      // recipeId: recipeId,
    },
  };
}
