import mongoose from "mongoose";
import express from "express";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify the directory to save the uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Create a unique filename
  },
});

const upload = multer({ storage }); // Create multer instance

// export const register = async (req, res) => {
//   try {
//     const { fullName, email, password, role, phoneNo } = req.body;
//     // console.log(fullName , email , password , role , phoneNo);
//     if (!fullName || !email || !password || !role || !phoneNo) {
//       return res.status(400).json({
//         message: "All fields are required",
//         success: false,
//       });
//     }
//     const user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({
//         message: "User already exists",
//         success: false,
//       });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     await User.create({
//       fullName,
//       email,
//       password: hashedPassword,
//       role,
//       phoneNo,
//     });
//     res.status(200).json({
//       message: "User created successfully",
//       success: true,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const register = async (req, res) => {
  try {
    const { fullName, email, password, role, phoneNo } = req.body;

    // Validate required fields
    if (!fullName || !email || !password || !role || !phoneNo) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Handle uploaded profile photo
    const profilePhoto = req.file ? `uploads/${req.file.filename}` : "";

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role,
      phoneNo,
      profile: {
        profilePhoto,  // Save photo path (filename only)
        skills: [],    // Empty skills initially
      },
    });

    // Respond
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });

  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};



export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    // console.log(email, password, role);

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
        success: false,
      });
    }
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account does'nt exist with current role",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      phoneNo: user.phoneNo,
      profile: user.profile,
    };
    return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
      message: `Welcome back ${user.fullName}`,
      user,
      success: true
  })
} catch (error) {
  console.log(error);
}
};

export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", null, { maxAge: 1, httpOnly: true, sameSite: "strict" })
      .json({
        message: "Logged out successfully",
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

// export const updateProfile = async (req, res) => {
//   try {
    
//     let { fullName, email, phoneNo, skills, bio } = req.body;
//     console.log(fullName, email, phoneNo, skills, bio);
//     const file = req.file;
//     let skillsArray;
//     if (skills) {
//       skillsArray = skills.split(",");
//     }
//     const userId = req.user._id;
//     let user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//         success: false,
//       });
//     }

//     if (fullName) user.fullName = fullName;
//     if (email) user.email = email;
//     if (phoneNo) user.profile.phoneNo = phoneNo;
//     if (skills) user.profile.skills = skillsArray;
//     if (bio) user.profile.bio = bio;

//     await user.save();

//     user = {
//       _id: user._id,
//       fullName: user.fullName,
//       email: user.email,
//       role: user.role,
//       phoneNo: user.phoneNo,
//       profile: user.profile,
//     };

//     return res.status(200).json({
//       message: "User updated successfully",
//       success: true,
//       user,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       message: error.message,
//       success: false,
//     });
//   }
// };
// 


// Profile update controller

export const updateProfile = async (req, res) => {
  const { fullName, phoneNo, email, bio } = req.body;

  let skills = req.body.skills || [];
  
  // Handle agar skills ek string hai
  if (typeof skills === 'string') {
    skills = [skills]; // Single skill ko bhi array bana do
  }

  console.log("Skills Array: ", skills);
  console.log("Files: ", req.files);

  const profilePhoto = req.files?.profilePhoto?.[0];
  const resume = req.files?.resume?.[0];

  try {
    const updatedUser = {
      fullName,
      phoneNo,
      email,
      "profile.bio":bio,
      "profile.skills": skills,
      "profile.profilePhoto": profilePhoto ? profilePhoto.path : undefined,
      "profile.resume": resume ? resume.path : undefined,
    };

    const user = await User.findByIdAndUpdate(req.user.id, updatedUser, { new: true });

    return res.json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error updating profile" });
  }
};

