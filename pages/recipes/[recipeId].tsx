import { css } from '@emotion/react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../../components/Layout';
import { getRecipeById, Recipe } from '../../util/database';

const dynamicPageStyle = css`
  display: grid;
  justify-content: center;
  margin-left: 20px;
  margin-right: 20px;
`;
const ingredStyle = css`
  width: 250px;
`;

type Props = {
  recipe: Recipe;
  userObject: { username: string };
};

export default function SingleRecipe(props: Props) {
  return (
    <Layout userObject={props.userObject}>
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

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<{ recipe?: Recipe }>> {
  const recipeId = context.query.recipeId;

  // Animal id is not correct type
  if (!recipeId || Array.isArray(recipeId)) {
    return { props: {} };
  }

  const recipe = await getRecipeById(parseInt(recipeId));
  return {
    props: {
      recipe: recipe,
      // recipeId: recipeId,
    },
  };
}
