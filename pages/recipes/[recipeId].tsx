import { css } from '@emotion/react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Layout from '../../components/Layout';
import {
  getCommentByRecipeId,
  getRecipeById,
  getUserByValidSessionToken,
  Recipe,
} from '../../util/database';

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
  recipeComment: {
    comment: string;
    id: number;
    recipe_id: number;
    user_id: number;
  }[];
  userId: number;
};

export default function SingleRecipe(props: Props) {
  const [userComment, setUserComment] = useState<string>('');
  const [initialComment, setInitialComment] = useState(props.recipeComment);

  const deleteComment = async (id: number) => {
    const response = await fetch(`/api/comment`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        commentId: id,
      }),
    });
    const newResponse = await response.json();
    console.log('newResponse', newResponse.deletedComment);
    const newCommentList = initialComment.filter((comment) => {
      return newResponse.deletedComment.id !== comment.id;
    });
    setInitialComment(newCommentList);
  };

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
      <form
        css={dynamicPageStyle}
        onSubmit={async (event) => {
          // console.log(userComment);
          event.preventDefault();

          const commentResponse = await fetch('/api/comment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userComment: userComment,
              recipeId: props.recipe.id,
              userId: props.userId,
            }),
          });
          const newComment = await commentResponse.json();
          console.log('commentResponse.body', newComment);
          setUserComment('');
          const newCommentList = [...initialComment, newComment];
          setInitialComment(newCommentList);

          return;
        }}
      >
        <label>
          <textarea
            value={userComment}
            onChange={(event) => setUserComment(event.currentTarget.value)}
          />
        </label>
        <button>Submit</button>
      </form>
      {initialComment.length === 0 ? (
        <div>Please add a comment! </div>
      ) : (
        initialComment.map((e) => {
          return (
            <div key={e.comment}>
              {e.comment}{' '}
              <div>
                <button onClick={() => deleteComment(e.id)}>❌</button>
              </div>
            </div>
          );
        })
      )}
    </Layout>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<
  GetServerSidePropsResult<{
    recipe?: Recipe;
  }>
> {
  const recipeId = context.query.recipeId;
  const token = context.req.cookies.sessionToken;
  const user = await getUserByValidSessionToken(token);

  if (!user) {
    return {
      redirect: {
        destination: `/login?returnTo=/recipes/${recipeId}`,
        permanent: false,
      },
    };
  }
  if (!recipeId || Array.isArray(recipeId)) {
    return { props: {} };
  }
  const recipeComment = await getCommentByRecipeId(parseInt(recipeId));

  const recipeCommentMap = recipeComment.map((recipe) => recipe.comment);
  // console.log('recipeComment in server', recipeCommentMap);
  const recipe = await getRecipeById(parseInt(recipeId));
  return {
    props: {
      recipe: recipe,
      recipeComment: recipeComment,
      userId: user?.id,
      // recipeId: recipeId,
    },
  };
}
