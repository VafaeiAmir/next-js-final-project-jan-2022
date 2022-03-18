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
}

//   if (request.method === 'DELETE') {
//     const commentFromRequest = request.body;
//     const newCommentList = await deleteComment(
//       commentFromRequest.userComment,
//       commentFromRequest.userId,
//       commentFromRequest.recipeId,
//     );
//     response.status(200).json(newCommentList);
//     return;
//   }
// }
