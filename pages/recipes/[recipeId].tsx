import { css } from '@emotion/react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import {
  getCommentByRecipeId,
  getRecipeById,
  getUserByValidSessionToken,
  Recipe,
} from '../../util/database';

// import { CommentResponseBody } from '../api/comment';

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
  recipeComment: string[];
  userId: number;
};

export default function SingleRecipe(props: Props) {
  const [userComment, setUserComment] = useState('');
  // const [commentsList, setCommentsList] = useState([]);
  // const [remove, setRemove] = useState(false);

  // async function deleteComment(id: number) {
  //   const response = await fetch(`/api/comment/${id}`, {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   const deletedComment = await response.json();
  //   const newCommentList = userComment.filter(
  //     (comment) => deletedComment.id !== comment.id,
  //   );
  //   setUserComment(newCommentList);
  // }

  // useEffect(() => {
  //   async function getAllComments() {
  //     const response = await fetch('/api/comment');
  // const allComments = await response.json();

  // setCommentsList(allComments);
  //   }
  //   getAllComments();
  // });

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
          console.log(userComment);
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
          // const commentResponseBody =
          //   (await commentResponse.json()) as CommentResponseBody;

          // const createdComment = await Response.json();
          setUserComment('');

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

        {props.recipeComment.length === 0 ? (
          <div>Please add a comment! </div>
        ) : (
          props.recipeComment.map((e) => {
            return <div key={e.comment}>{e.comment}</div>;
          })
        )}
      </form>
      {/* <form
        css={dynamicPageStyle}
        onSubmit={async (event) => {
          event.preventDefault();
          const commentResponse = await fetch('/api/comment', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userComment: userComment,
              recipeId: props.recipe.id,
              userId: props.userId,
            }),
          });
          // const commentResponseBody =
          //   (await commentResponse.json()) as CommentResponseBody;

          // const createdComment = await Response.json();
          setUserComment('');

          return;
        }}
      >
        <button>Delete Comment</button>
      </form> */}
    </Layout>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<{ recipe?: Recipe }>> {
  const recipeId = context.query.recipeId;
  const token = context.req.cookies.sessionToken;
  const user = await getUserByValidSessionToken(token);
  // console.log(context.query);
  // console.log('user', user.id);
  // console.log('CHECKING RECIPE ID: ', context.query.recipeId);

  if (!recipeId || Array.isArray(recipeId)) {
    return { props: {} };
  }
  const recipeComment = await getCommentByRecipeId(parseInt(recipeId));

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
