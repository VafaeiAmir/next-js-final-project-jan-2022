import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../../components/Layout';
import { getRecipeById } from '../../util/database';

const dynamicPageStyle = css`
  display: grid;
  justify-content: center;
  margin-left: 20px;
  margin-right: 20px;
`;
const ingredStyle = css`
  width: 250px;
`;

export type Recipe = {
  id: number;
  name: string;
  ingredients: string;
  text: string;
};

type Props = {
  recipe: Recipe;
};

export default function SingleRecipe(props: Props) {
  return (
    <Layout>
      <Head>
        <title>{props.recipe.name}</title>
        <meta
          name="description"
          content={`${props.recipe.name} is a persian dish that can be cooked with rice`}
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const recipeId = context.query.recipeId;
  const recipe = await getRecipeById(recipeId);
  return {
    props: {
      recipe: recipe,
      // recipeId: recipeId,
    },
  };
}
