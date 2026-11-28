import {
  findCommentsByProductId,
  addComment,
  modifyComment,
  deleteComment as removeComment,
} from '../models/comment-model.js';

const getCommentsByProductId = async (req, res) => {
  const result = await findCommentsByProductId(req.params.productId);
  if (!result.error) {
    res.json(result);
  } else {
    res.status(500).json(result);
  }
};

const postComment = async (req, res, next) => {
  try {
    const {product_id, content} = req.body;
    if (!product_id || !content) {
      const error = new Error('product_id ja content ovat pakollisia');
      error.status = 400;
      return next(error);
    }

    const result = await addComment({
      product_id,
      user_id: req.user.user_id,
      content,
    });

    if (!result) {
      const error = new Error('Kommentin lisääminen epäonnistui');
      error.status = 400;
      return next(error);
    }

    res.status(201).json({message: 'Kommentti lisätty', result});
  } catch (error) {
    next(error);
  }
};

const putComment = async (req, res, next) => {
  try {
    const result = await modifyComment(
      req.params.id,
      req.body.comment_text,
      req.user
    );
    if (!result) {
      const error = new Error(
        'Kommenttia ei löytynyt tai sinulla ei ole käyttöoikeutta'
      );
      error.status = 404;
      return next(error);
    }
    if (result.error) {
      const error = new Error(result.error);
      error.status = 400;
      return next(error);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const result = await removeComment(req.params.id, req.user);
    if (!result) {
      const error = new Error(
        'Kommenttia ei löytynyt tai sinulla ei ole käyttöoikeutta'
      );
      error.status = 404;
      return next(error);
    }
    if (result.error) {
      const error = new Error(result.error);
      error.status = 400;
      return next(error);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export {getCommentsByProductId, postComment, putComment, deleteComment};
