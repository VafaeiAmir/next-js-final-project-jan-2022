import { NextApiRequest, NextApiResponse } from 'next';
import { createUserRecipe, deleteUserRecipeById } from '../../util/database';

export default async function userRecipeHandler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === 'POST') {
    const userRecipeFromRequest = request.body;

    const newUserRecipe = await createUserRecipe(
      userRecipeFromRequest.userId,
      userRecipeFromRequest.userRecipeName,
      userRecipeFromRequest.userRecipeText,
      userRecipeFromRequest.userRecipeIngredients,
    );

    response.json(newUserRecipe);
    return;
  }
  if (request.method === 'DELETE') {
    const deletedUserRecipe = await deleteUserRecipeById(
      parseInt(request.body.userRecipeId),
    );
    response.status(201).json({ deletedUserRecipe: deletedUserRecipe });

    return;
  }
}
