import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://imrankhan:qtkPt6XOTOW1SAEX@cluster0.omekinp.mongodb.net/postfordollars', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}
export default connectDB;
