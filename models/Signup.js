import mongoose from "mongoose";

const signupSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  phone: {
    type: String
  },
  contactName: {
    type: String
  },
  businessName: {
    type: String
  },
  websiteLink: {
    type: String,
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
  },
  businessImage: {
    type: String
  },
  description: {
    type: String
  },
  price: {
    type: String
  }
});

const Signup = mongoose.model("user", signupSchema);
export default Signup;

