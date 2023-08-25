import mongoose from "mongoose";

const posterToBusinessSchema = new mongoose.Schema({
  businessId: {
    type: String
  },
  selectedBusiness: {
    type: Object
  },
  faceBookDetails: {
    type: Object
  },
  instagramDetails: {
    type: Object
  },
  tikTokDetails: {
    type: Object
  },
  googleAccount: {
    type: String
  },
  yelpAccount: {
    type: String
  },
  tripAdvisorAccount: {
    type: String
  }
});

const PosterToBusiness = mongoose.model('PosterToBusiness', posterToBusinessSchema);
export default PosterToBusiness;
