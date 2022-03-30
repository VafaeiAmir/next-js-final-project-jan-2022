import { NextApiRequest, NextApiResponse } from 'next';
import { createComment, deleteCommentById } from '../../util/database';

export default async function commentHandler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === 'POST') {
    const commentFromRequest = request.body;

    const newComment = await createComment(
      commentFromRequest.userComment,
      commentFromRequest.userId,
      commentFromRequest.recipeId,
      commentFromRequest.username,
    );
    // console.log(newComment);
    response.json(newComment);
    return;
  }
  if (request.method === 'DELETE') {
    // console.log('delete', request.body);
    // const commentFromRequest = request.body;
    const deletedComment = await deleteCommentById(
      parseInt(request.body.commentId),

      // commentFromRequest.userComment,
      // commentFromRequest.userId,
      // commentFromRequest.recipeId,
    );
    response.status(201).json({ deletedComment: deletedComment });
    // console.log('newCommentList', deletedComment);
    return;
  }
}
