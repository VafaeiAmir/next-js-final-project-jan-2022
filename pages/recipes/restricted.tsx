import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import {
  getRecipes,
  getValidSessionByToken,
  Recipe,
} from '../../util/database';

const animalStyles = css`
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 20px;
`;

type Props =
  | {
      recipes: Recipe[];
    }
  | {
      error: string;
    };

export default function RecipesRestricted(props: Props) {
  if ('error' in props) {
    return (
      <Layout>
        <Head>
          <title>Recipes Error</title>
          <meta name="description" content="An error about an recipe " />
        </Head>
        <h1>Recipes Error</h1>
        {props.error}
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Recipes</title>
        <meta name="description" content="A list of Recipes" />
      </Head>
      <h1>Recipes</h1>
      {props.recipes.map((recipe) => {
        return (
          <div key={`recipe-${recipe.id}`} css={animalStyles}>
            <Link href={`/recipe-management-naive-dont-copy/read/${recipe.id}`}>
              <a>
                {recipe.name} is a {recipe.text} with a {recipe.ingredients}
              </a>
            </Link>{' '}
          </div>
        );
      })}
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const sessionToken = context.req.cookies.sessionToken;
  const session = await getValidSessionByToken(sessionToken);

  if (!session) {
    return {
      props: {
        error: 'You need to Log in to see recipes ',
      },
    };
  }

  const recipes = await getRecipes();
  return {
    props: {
      recipes: recipes,
    },
  };
}
