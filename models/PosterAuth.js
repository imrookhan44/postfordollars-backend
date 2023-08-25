import mongoose from "mongoose";

const posterAuthSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  password: {
    type: String
  },
  stripe_account_id: {
    type: String
  },
  role: {
    type: String
  },
  stripe_refresh_token: {
    type: String
  },
  stripe_access_token: {
    type: String
  }

});

const PosterAuth = mongoose.model("posterAuth", posterAuthSchema);
export default PosterAuth;
