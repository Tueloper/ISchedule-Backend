/* eslint-disable import/extensions */
import { Router } from 'express';
import { AuthMiddleware } from '../middlewares';
import { AuthController } from '../controller';

const router = Router();
const {
  verifySignup,
} = AuthMiddleware;
const {
  // registerPhoneNumber,
  // verifyToken,
  // resendToken,
  signup,
} = AuthController;

// router.post('/verifyNumber', verifyUser, registerPhoneNumber);
// router.post('/verifyToken', validateTokenValue, verifyToken);
// router.post('/resendToken', verifyEmail, resendToken);
router.post('/signup', verifySignup, signup);

export default router;
