import express from 'express'
import { signupPosterAccount } from '../controllers/PosterAuth.js';
import { connectPosterAccount, handlePosterAuthorization } from '../controllers/Stripe.js';

const router = express.Router();
router.post('/createPosterAccount', signupPosterAccount);
router.post('/connectAccount', connectPosterAccount)
router.post('/authorize-poster/:userId', handlePosterAuthorization)

export default router;