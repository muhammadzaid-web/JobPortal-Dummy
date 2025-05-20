import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNo: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type:String,
    enum: ['student', 'recruiter'],
    required: true,
},
  profile:{
    company:{ type: mongoose.Schema.Types.ObjectId,ref: 'Company'},
    skills:[{type:String}],//array of skills
    bio:{type:String},
    resume:{type:String},
    resumeOriginalName:{type:String},
    profilePhoto:{type:String,default:''},
}
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);