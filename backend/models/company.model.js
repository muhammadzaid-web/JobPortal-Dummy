import mongoose from "mongoose";

const companySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  logo: {
    type: String,
    default:null
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

},{timestamps:true});

export default mongoose.model("Company", companySchema);