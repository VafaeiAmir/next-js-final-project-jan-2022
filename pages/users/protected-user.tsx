import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import Layout from '../../components/Layout';
import {
  getCommentsByUserId,
  getUserByValidSessionToken,
} from '../../util/database';
import styles from './userProfile.module.css';

type Props = {
  commentsInProfile: {
    id: number;
    recipeId: number | undefined;
    userId: number;
    comment: string | undefined;
  }[];

  userObject: { username: string };
  user: { id: number; username: string };
};
export default function ProtectedUser(props: Props) {
  const [userRecipeName, setUserRecipeName] = useState('');
  const [userRecipeText, setUserRecipeText] = useState('');
  const [userRecipeIngredients, setUserRecipeIngredients] = useState('');

  return (
    <Layout userObject={props.userObject}>
      <Head>
        <title>User profile</title>
      </Head>
      <div className={styles.dynamicPage}>
        <h1>Welcome to your own profile {props.user.username}</h1>
        <h2> This is your personal user id number: {props.user.id}</h2>

        {props.commentsInProfile.map((comment) => {
          return (
            <div key={`comment-${comment.comment}`}>
              Commented: {comment.comment}
            </div>
          );
        })}
      </div>
      <div className={styles.container}>
        <form
          className={styles.logText}
          onSubmit={async (event) => {
            event.preventDefault();

            await fetch('/api/userRecipe', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userRecipeName: userRecipeName,
                userRecipeText: userRecipeText,
                userRecipeIngredients: userRecipeIngredients,
                userId: props.user.id,
              }),
            });
          }}
        >
          <h1>Create new recipe</h1>
          <label className={styles.lable}>
            Recipe name:{' '}
            <input
              value={userRecipeName}
              onChange={(event) => setUserRecipeName(event.currentTarget.value)}
            />
          </label>
          <label className={styles.lable}>
            Text:{' '}
            <input
              value={userRecipeText}
              onChange={(event) => setUserRecipeText(event.currentTarget.value)}
            />
          </label>
          <label className={styles.lable}>
            Ingredients:{' '}
            <input
              value={userRecipeIngredients}
              onChange={(event) =>
                setUserRecipeIngredients(event.currentTarget.value)
              }
            />
          </label>

          <button className={styles.loginButton}>Post</button>
        </form>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // 1. Get a user from the cookie sessionToken

  // const recipeId = context.query.recipeId;
  const token = context.req.cookies.sessionToken;
  const user = await getUserByValidSessionToken(token);

  if (!user) {
    return {
      redirect: {
        destination: `/login?returnTo=/users/protected-user`,
        permanent: false,
      },
    };
  }
  // const recipesInProfile = await getCommentedRecipesByUserId(recipes.id);

  const commentsInProfile = await getCommentsByUserId(user.id);
  console.log('commentsInProfile', commentsInProfile);

  // 2. If there is a user, return that and render page

  return {
    props: {
      user: user,
      commentsInProfile: commentsInProfile,
      // recipesInProfile: recipesInProfile,
    },
  };

  // 3. Otherwise redirect to login
}
