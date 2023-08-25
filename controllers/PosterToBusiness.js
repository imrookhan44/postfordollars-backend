import PosterToBusiness from "../models/posterToBusiness.js";
import cloudinary from "../config/Upload.js";

export const createPosterToBusiness = async (req, res) => {
  const {
    businessId,
    selectedBusiness,
    faceBookDetails,
    instagramDetails,
    tiktokDetails,
    googleAccount,
    yelpAccount,
    tripAdvisorAccount,
  } = req.body;

  try {
    console.log("FaceBook Screenshot URL:", faceBookDetails.screenshot);
    console.log("Instagram Screenshot URL:", instagramDetails.screenshot);

    const uploadedImages = await Promise.all([
      cloudinary.uploader.upload(faceBookDetails.screenshot, { folder: "uploads" }),
      cloudinary.uploader.upload(instagramDetails.screenshot, { folder: "uploads" }),
      cloudinary.uploader.upload(tiktokDetails.screenshot, { folder: "uploads" }),
    ]);
    const newPosterToBusiness = new PosterToBusiness({
      businessId,
      selectedBusiness,
      faceBookDetails: { ...faceBookDetails, screenshot: uploadedImages[0].secure_url },
      instagramDetails: { ...instagramDetails, screenshot: uploadedImages[1].secure_url },
      tikTokDetails: { ...tiktokDetails, screenshot: uploadedImages[2].secure_url },
      googleAccount,
      yelpAccount,
      tripAdvisorAccount,
    });

    const result = await newPosterToBusiness.save();
    res.status(200).json(result);
  } catch (error) {
    console.error(error); // Log the specific error for debugging
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getPosterToBusiness = async (req, res) => {
  const { businessId } = req.body;
  try {
    const posterToBusiness = await PosterToBusiness.find(businessId)
    res.status(200).json(posterToBusiness);
  } catch (error) {
    console.error(error); // Log the specific error for debugging
    res.status(500).json({ message: "Something went wrong" });
  }
};
