import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';

import Layout from '../../components/Layout';
import {
  getCommentsByUserId,
  getUserByValidSessionToken,
  Recipe,
} from '../../util/database';
import styles from './userProfile.module.css';

type Props = {
  commentsInProfile: {
    id: number;
    recipeId: number | undefined;
    userId: number;
    comment: string | undefined;
  };
  recipe: Recipe;
  comment: string;
  userObject: { username: string };
  user: { id: number; username: string };
  recipeComment: {
    comment: string;
    username: string;
    id: number;
    recipe_id: number;
    user_id: number;
  }[];
  userId: number;
};
export default function ProtectedUser(props: Props) {
  return (
    <Layout userObject={props.userObject}>
      <Head>
        <title>User profile</title>
      </Head>
      <h1>Welcom to your own profile {props.user.username}</h1>
      <div> This is your personal user id: {props.user.id}</div>
      {props.commentsInProfile.map((comment) => {
        return <div>{comment.comment}</div>;
      })}
    </Layout>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<{}>> {
  // 1. Get a user from the cookie sessionToken
  const recipeId = context.query.recipeId;
  const token = context.req.cookies.sessionToken;
  const user = await getUserByValidSessionToken(token);

  // const recipesInProfile = await getCommentedRecipesByUserId();

  const commentsInProfile = await getCommentsByUserId(user.id);
  // console.log('commentsInProfile', commentsInProfile);

  // 2. If there is a user, return that and render page
  if (user) {
    return {
      props: {
        user: user,
        commentsInProfile: commentsInProfile,
      },
    };
  }

  // 3. Otherwise redirect to login
  return {
    redirect: {
      destination: `/login?returnTo=/users/protected-user`,
      permanent: false,
    },
  };
}
