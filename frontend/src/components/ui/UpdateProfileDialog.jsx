import axios from "axios";
import { Loader2, XIcon } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "../../utils/constant";
import { setLoading, setUser } from "../../redux/authSlice";
import { showToast } from "../../redux/toastSlice";

function UpdateProfileDialog({ open, setOpen }) {
  // const [fullName, setFullName] = useState("");
  // const [phoneNo, setPhoneNo] = useState("");
  // const [skills, setSkills] = useState([]);
  // const [bio, setBio] = useState("");
  // const [resume, setResume] = useState(null);
  // const [file, setProfilePhoto] = useState(null);
  // const profile={skills:[skills],file:file}

  const dispatch = useDispatch();
  const [toasts, setToasts] = useState([]);
  const {user} = useSelector((state) => state.auth);
  const {loading} = useSelector((state) => state.auth);
  const [input, setInput] = useState({
    fullName: user?.fullName,
    phoneNo: user?.phoneNo,
    email: user?.email,
    skills: user?.profile?.skills || [], // fixed unnecessary .map
    bio: user?.profile?.bio || "",
    resume:null,
    file: null // safer than user?.file
  });
  const addToast = (message, type) => {
    const newToast = { id: Date.now(), message, type };
    setToasts((prevToasts) => [...prevToasts, newToast]);

    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((t) => t.id !== newToast.id));
    }, 3000);
  };

  
  const changeEventHandler = (e) => {
    const { name, value } = e.target;
  
    setInput({
      ...input,
      [name]: name === "skills"
        ? value.split(",").map(skill => skill.trim()) // split string to array
        : value,
    });
  };

  const changeResumeHandler = (e) => {
    const resume = e.target.files?.[0];
    if (resume) {
      setInput({
        ...input,
        resume, // <-- store resume file
      });
    }
  };

const changeFileHandler = (e) => {
  const file = e.target.files?.[0];
  if (file) {
    setInput({
      ...input,
      file
    });
  }
};

  // handleSubmit function
const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("fullName", input.fullName);
  formData.append("phoneNo", input.phoneNo);
  formData.append("email", input.email);
  formData.append("bio", input.bio);

  // skills ko ek-ek karke formData me daalo
  input.skills.forEach((skill) => {
    formData.append("skills", skill);
  });

  if (input.resume) {
    formData.append("resume", input.resume);
  }

  if (input.file) {
    formData.append("profilePhoto", input.file); // yaha correct field name
  }

  try {
    dispatch(setLoading(true));
    const response = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    if (response.data.success) {
      dispatch(setUser(response.data.user));
      dispatch(showToast({
        message:`${response.data.user.fullName}'s profile is updated`,
        type:"success",
      }))
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
  } catch (err) {
    dispatch(showToast({
      message:"Something went wrong",
      type:"error"
    }))
  } finally {
    dispatch(setLoading(false));
  }
};


  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        data-aos="fade-down"
        data-aos-delay="400"
        className="w-full sm:max-w-[80%] max-h-fit md:max-w-md bg-slate-800 rounded-lg shadow-xl p-4 sm:p-6 relative"
      >
        <button
          className="absolute top-4 right-4 text-white hover:text-cyan-300 hover:bg-slate-500/40 p-2 transition-all rounded-full"
          onClick={() => setOpen(false)}
        >
          <XIcon />
        </button>
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">
          Update <span className="text-indigo-600">Profile</span>
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label htmlFor="fullName" className="w-full sm:w-1/5 text-sm font-medium ">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={input.fullName}
              onChange={changeEventHandler}
              placeholder="Enter your full name"
              className="w-full sm:flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* email */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label htmlFor="email" className="w-full sm:w-1/5 text-sm font-medium ">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Enter your full name"
              className="w-full sm:flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label htmlFor="phoneNo" className="w-full sm:w-1/5 text-sm font-medium ">
              Phone
            </label>
            <input
              type="tel"
              id="phoneNo"
              name="phoneNo"
              value={input.phoneNo}
              onChange={changeEventHandler}
              placeholder="Enter your phone number"
              className="w-full sm:flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Skills */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label htmlFor="skills" className="w-full sm:w-1/5 text-sm font-medium ">
              Skills
            </label>
            <input
              type="text"
              id="skills"
              name='skills'
              value={input.skills.join(",")}
              onChange={changeEventHandler}
              placeholder="Enter skills"
              className="w-full sm:flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Bio */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-2">
            <label htmlFor="bio" className="w-full sm:w-1/5 text-sm font-medium ">
              Bio
            </label>
            <input
              id="bio"
              name='bio'
              value={input.bio}
              onChange={changeEventHandler}
              placeholder="Enter a short bio"
              className="w-full sm:flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 min-h-sm"
            />
          </div>
<div className="w-full flex sm:flex-col lg:flex-wrap gap-2 ">
    
          {/* Upload resume */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label htmlFor="resume" className="w-full sm:w-1/5 text-sm font-medium ">
              Resume
            </label>
            <input
              type="file"
              accept='application/pdf'
              id="resume"
              name="resume"
              onChange={changeResumeHandler}
              className="w-full sm:flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* Profile Photo */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label htmlFor="file" className="w-full sm:w-1/5 text-sm font-medium ">
              Photo
            </label>
            <input
              type="file"
              id="file"
              name="file"
              accept='image/*'
              onChange={changeFileHandler}
              className="w-full sm:flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
</div>

          {/* Submit Button */}
          {loading ? (
            <button className="btn btn-accent text-white text-shadow w-full my-4 text-lg">
              <Loader2 className="mr-2 h-6 w-6  animate-spin"></Loader2>
              Please wait
            </button>
          ) : (
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Update Profile
          </button>)
}
        </form>
        </div>
        
      {/* Toast Notifications */}
      <div className="toast toast-bottom toast-end space-y-2">
        {toasts.map((toast) => (
          <div key={toast.id} className={`alert ${toast.type} toast-animation`}>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

      

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .toast-animation {
            animation: fadeIn 0.3s ease-out;
          }
        `}
      </style>
    </div>
  );
}

export default UpdateProfileDialog;
