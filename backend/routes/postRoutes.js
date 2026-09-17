import { Router } from 'express';
import {
  getPosts,
  createPost,
  likePost,
  getComments,
  addComment,
} from '../controllers/postController.js';

const router = Router();

router.get('/', getPosts);
router.post('/', createPost);
router.post('/:id/like', likePost);
router.get('/:id/comments', getComments);
router.post('/:id/comments', addComment);

export default router;
