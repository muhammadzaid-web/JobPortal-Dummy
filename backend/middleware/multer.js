import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure uploads folder exists
const uploadPath = "uploads/";
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}

// Multer storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname).toLowerCase());
    },
});

// ✅ File filter for images (profile photo, logo)
const imageFileFilter = (req, file, cb) => {
    const allowedImageTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedImageTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only JPEG, JPG, PNG allowed for images."), false);
    }
};

// ✅ File filter for PDF (resume)
const resumeFileFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(new Error("Only PDF allowed for resume."), false);
    }
};

// ✅ Exports

// For uploading profile photo (image only)
export const uploadProfilePhoto = multer({ storage, fileFilter: imageFileFilter }).single("profilePhoto");

// For uploading resume (PDF only)
export const uploadResume = multer({ storage, fileFilter: resumeFileFilter }).single("resume");

// For uploading logo (image only)
export const singleUploadLogo = multer({ storage, fileFilter: imageFileFilter }).single("logo");

// For uploading both profile and resume (optional)
export const upload = multer({ storage }).fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "resume", maxCount: 1 },
]);

