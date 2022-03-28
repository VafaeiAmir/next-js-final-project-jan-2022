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
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;
`;
const ingredStyle = css`
  width: 450px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 10px;
`;
const deleteButtonStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: red;
  padding: 6px;
  border-radius: 2%;
  margin-left: 10px;
  color: white;
  height: 15px;
  font-size: 0.5rem;
  margin-top: auto;
  :hover {
    font-size: 0.9rem;
    transition: font-size 0.2s ease;
  }
`;
const commentedStyle = css`
  display: flex;
  justify-content: space-between;
  width: 320px;
  background-color: aliceblue;
  border-radius: 10px;
  border: 2px solid #ccc;
  padding: 10px;
  margin: auto;
`;
const commentFieldStyle = css`
  display: flex;
  justify-content: center;
`;
const recipeTextStyle = css`
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 10px;
`;
const postButtonStyle = css``;
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
  console.log('props', props);
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
    // console.log('newResponse', newResponse.deletedComment);
    const newCommentList = initialComment.filter((comment) => {
      return newResponse.deletedComment.id !== comment.id;
    });
    setInitialComment(newCommentList);
  };
  // console.log('props.userObj', props.userObject);
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

        <h1 css={recipeTextStyle}>{props.recipe.text}</h1>
        <p css={ingredStyle}>{props.recipe.ingredients}</p>

        <form
          css={commentFieldStyle}
          onSubmit={async (event) => {
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
                username: props.userObject.username,
              }),
            });
            const newComment = await commentResponse.json();
            // console.log('commentResponse.body', newComment);
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
          <button css={postButtonStyle}>post</button>
        </form>
      </div>
      {initialComment.length === 0 ? (
        <div css={commentedStyle}>Please add a comment! </div>
      ) : (
        initialComment.map((e) => {
          return (
            <div css={commentedStyle} key={e.comment}>
              {e.username}: {e.comment}{' '}
              <button
                css={deleteButtonStyle}
                onClick={() => deleteComment(e.id)}
              >
                X
              </button>
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
