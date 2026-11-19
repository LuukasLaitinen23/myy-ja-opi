import {findCommentsByProductId} from '../models/comment-model.js';

const getCommentsByProductId = async (req, res) => {
  const result = await findCommentsByProductId(req.params.productId);
  if (!result.error) {
    res.json(result);
  } else {
    res.status(500).json(result);
  }
};

export {getCommentsByProductId};
