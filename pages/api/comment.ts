import { NextApiRequest, NextApiResponse } from 'next';
import { createComment } from '../../util/database';

// type CommentRequestBody = {
//   userComment: string;
//   userId: number;
// };

export default async function commentHandler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  // const { commentId } = request.query;
  // if (request.method === 'GET') {
  //   const comment = comments.find(
  //     (comment) => comment.id === parseInt(commentId),
  //   );
  //   response.status(200).json(comment);
  // } else if (request.method === 'DELETE') {
  //   const deletedComment = comments.find(
  //     (comment) => comment.id === parseInt(commentId),
  //   );
  //   const index = comments.findIndex(
  //     (comment) => comment.id === parseInt(commentId),
  //   );
  //   comments.splice(index, 1);
  //   response.status(200).json(deletedComment);
  // }
  if (request.method === 'POST') {
    const commentFromRequest = request.body;
    // console.log('body', commentFromRequest);
    // console.log(commentFromRequest.userComment);
    // console.log(commentFromRequest.userId);
    // console.log(commentFromRequest.recipeId);

    const newComment = await createComment(
      commentFromRequest.userComment,
      commentFromRequest.userId,
      commentFromRequest.recipeId,
    );
    response.status(200).json(newComment);
    return;
  }
  if (request.method === 'DELETE') {
    console.log('delete', request.body);
    // const commentFromRequest = request.body;
    // const newCommentList = await deleteComment(
    //   commentFromRequest.userComment,
    //   commentFromRequest.userId,
    //   commentFromRequest.recipeId,
    // );
    // response.status(200).json(newCommentList);
    // return;
  }
}
