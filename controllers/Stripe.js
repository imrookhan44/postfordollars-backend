import Stripe from 'stripe';
import PosterAuth from '../models/PosterAuth.js';
const stripe = Stripe('sk_test_51LkMoWArkpbHU2Aqf0lef7mHc9Kx1HefsHSRKnMrrLRM619SJvCHpYiXgO2x28fgUiOcZw9JDZJEhnkMygtzvyzu00fg73o1rT');

export const connectPosterAccount = async (req, res) => {
  const { userId } = req.body;
  const userById = await PosterAuth.findById(userId);
  console.log(userById);
  try {
    const account = await stripe.accounts.create({
      type: 'express'
    });
    const accountID = account.id;

    console.log('accountID: ', accountID);
    if (userById) {
      const userData = await User.findByIdAndUpdate(userById, { $set: { "stripe_account_id": accountID } })
      console.log(' userData after update : ', userData);
    }
    res.send({ account_id: accountID });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.message });
  }
};

// handle poster authorization after stripe connect
export const handlePosterAuthorization = async (req, res) => {
  const { code } = req.query;
  const { userId } = req.params;
  console.log('userId: ', userId);
  const userById = await PosterAuth.findById(userId)
  console.log('userById: ', userById);

  try {
    const response = await stripe.oauth.token({
      grant_type: 'authorization_code',
      code,
    });

    // Save the access token and refresh token to your database
    const { access_token, refresh_token, stripe_user_id } = response;
    if (userById) {
      const userData = await PosterAuth.findByIdAndUpdate(userById, { $set: { "stripe_account_id": stripe_user_id, "stripe_refresh_token": refresh_token, "stripe_acess_token": access_token } })
      console.log(' userData after update : ', userData);
    }
    res.json({
      access_token,
      refresh_token,
      stripe_user_id,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message,
    });
  }
};

