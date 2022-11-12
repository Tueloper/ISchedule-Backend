/* eslint-disable import/extensions */
import { Router } from 'express';
import { AuthMiddleware } from '../middlewares';
import { AuthController } from '../controller';

const router = Router();
const {
  verifySignup,
  verifyLogin,
  authenticate,
} = AuthMiddleware;
const {
  signup,
  login,
  getProfile,
} = AuthController;

router.post('/signup', verifySignup, signup);
router.post('/login', verifyLogin, login);
router.get('/profile', authenticate, getProfile);

export default router;
