/* eslint-disable import/extensions */
import { Router } from 'express';
import { AuthMiddleware } from '../middlewares';
import { AuthController } from '../controller';

const router = Router();
const {
  verifySignup,
  verifyLogin,
} = AuthMiddleware;
const {
  signup,
  login,
} = AuthController;

router.post('/signup', verifySignup, signup);
router.post('/login', verifyLogin, login);

export default router;
