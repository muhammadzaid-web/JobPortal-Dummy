// import { Link } from "react-router-dom";
// import Navbar from "../shared/Navbar";
// import { useState } from "react";
// import axios from "axios";
// import { USER_API_END_POINT } from "../../utils/constant";

// function Signup() {
//   const [showToast, setShowToast] = useState(false);
//   const [message, setMessage] = useState("");
//   const [toastType, setToastType] = useState("alert-info"); // Default to info

//   const [input, setInput] = useState({
//     fullName: "",
//     email: "",
//     phoneNo: "",
//     password: "",
//     role: "",
//     file: "",
//   });

//   const changeEventHandler = (e) => {
//     const { name, value } = e.target;
//     setInput({ ...input, [name]: value });
//   };

//   const changeFileHandler = (e) => {
//     setInput({ ...input, file: e.target.files?.[0] });
//     // e.preventDefault()
//     console.log(input);
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     console.log(input);

//     const formData = new FormData();
//     formData.append("fullName", input.fullName);
//     formData.append("email", input.email);
//     formData.append("phoneNo", input.phoneNo);
//     formData.append("password", input.password);
//     formData.append("role", input.role);
//     if (input.file) {
//       formData.append("file", input.file);
//     }
//     console.log("formData", formData);
//     try {
//       const response = await axios.post(
//         `${USER_API_END_POINT}/register`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//           withCredentials: true,
//         }
//       );
//       if (response.status === 201) {
//         navigate("/");
//       }
//       setMessage(response.message);
//       setShowToast(true); // Show toast after success
//       setTimeout(() => setShowToast(false), 3000); // Auto-hide toast
//       return response.status(201).json(response.data);
//     } catch (error) {
//       setMessage("Error fetching data!");
//       setShowToast(true);
//       setToastType("alert-error"); // Red for errors
//       setTimeout(() => setShowToast(false), 3000);
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       {/*
//        */}
//       <form
//         onSubmit={submitHandler}
//         className="flex flex-col gap-4 border-t-1 border-base-content/30 bg-base-100 lg:w-2/5 md:w-1/2 w-3/4 sm:w-2/3 mx-auto px-5 py-2 rounded-xl shadow-md shadow-base-content/30"
//       >
//         <h1 className="font-bold text-3xl w-full text-center mb-4">
//           Sign<span className="text-red-600">Up</span>
//         </h1>

//         {/* Email */}
//         <div className="flex flex-col items-start gap-1 w-full ">
//           <label
//             htmlFor="email"
//             className="cursor-pointer flex items-center gap-1"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 16 16"
//               fill="currentColor"
//               className="h-4 w-4 opacity-70"
//             >
//               <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
//               <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
//             </svg>
//             Email
//           </label>
//           <input
//             type="text"
//             id="email"
//             value={input.email}
//             name="email"
//             onChange={changeEventHandler}
//             className="w-full input input-bordered"
//             placeholder="Email"
//           />
//         </div>

// {/* Full Name */}
// <div className="flex flex-col items-start gap-1 w-full ">
//   <label
//     htmlFor="fullName"
//     className="cursor-pointer flex items-center gap-1"
//   >
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 16 16"
//       fill="currentColor"
//       className="h-4 w-4 opacity-70"
//     >
//       <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
//     </svg>
//     Full Name
//   </label>
//           <input
//             type="text"
//             value={input.fullName}
//             name="fullName"
//             onChange={changeEventHandler}
//             id="fullName"
//             className="w-full input input-bordered"
//             placeholder="Username"
//           />
//         </div>

//         {/* Phone Number */}
//         <div className="flex flex-col items-start gap-1 w-full ">
//           <label
//             htmlFor="phoneNo"
//             className="cursor-pointer flex items-center gap-1"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 16 16"
//               fill="currentColor"
//               className="h-4 w-4 opacity-70"
//             >
//               <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
//             </svg>
//             Phone Number
//           </label>
//           <input
//             type="tel"
//             id="phoneNo"
//             value={input.phoneNo}
//             name="phoneNo"
//             onChange={changeEventHandler}
//             className="w-full input input-bordered"
//             placeholder="91+xxxxxxxx"
//           />
//         </div>

//         {/* Password */}
//         <div className="flex flex-col items-start gap-1 w-full ">
//           <label
//             htmlFor="password"
//             className="cursor-pointer flex items-center gap-1"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 16 16"
//               fill="currentColor"
//               className="h-4 w-4 opacity-70"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             value={input.password}
//             name="password"
//             onChange={changeEventHandler}
//             className="w-full input input-bordered"
//             placeholder="Password"
//           />
//         </div>
//         <div className="flex p-2  items-center justify-between lg:gap-6">
//           <input
//             id="student"
//             value="student"
//             type="radio"
//             name="role"
//             checked={input.role === "student"}
//             onChange={changeEventHandler}
//             className="radio lg:scale-75 bg-indigo-100 border-indigo-300 checked:bg-indigo-200 checked:text-indigo-600 checked:border-indigo-600"
//           />
//           <label
//             className="text-sm lg:-ml-6 font-medium cursor-pointer"
//             htmlFor="student"
//           >
//             Student
//           </label>
//           <input
//             id="recruiter"
//             value="recruiter"
//             type="radio"
//             name="role"
//             onChange={changeEventHandler}
//             checked={input.role === "recruiter"}
//             className="radio lg:scale-75 bg-indigo-100 border-indigo-300 checked:bg-indigo-200 checked:text-indigo-700 checked:border-indigo-800"
//           />
//           <label
//             className="text-sm  lg:-ml-6 font-medium cursor-pointer"
//             htmlFor="recruiter"
//           >
//             Recruiter
//           </label>
//           {/* <div className="flex items-center gap-0.5">
//               <label
//                 htmlFor="profilePhoto"
//                 className="cursor-pointer text-md font-medium"
//               >
//                 Profile
//               </label>
//               <input
//                 id="profilePhoto"
//                 accept="image/*"
//                 type="file"
//                 onChange={changeFileHandler}
//                 className="cursor-pointer input py-2 text-gray-500"
//               />
//             </div> */}
//           <input
//             type="file"
//             id="profilePhoto"
//             accept="image/*"
//             onChange={changeFileHandler}
//             className="file-input w-full max-w-xs"
//           />
//         </div>
//         <div className="md:w-full my-2 flex justify-center">
//           <button
//             type="submit"
//             className="btn bg-indigo-700 hover:bg-indigo-800 border-0 w-full text-lg text-white "
//           >
//             Sign Up
//           </button>
//         </div>
//         <span className="text-sm">
//           Already have an account ?{" "}
//           <Link to="/login" className="text-sm text-indigo-600 hover:underline">
//             login
//           </Link>
//         </span>
//       </form>
//       {showToast && (
//         <div className="toast toast-top toast-end">
//           <div className={`alert ${toastType}`}>
//             <span>{message}</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Signup;
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { setLoading } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { showToast } from "../../redux/toastSlice";

function Signup() {
  const dispatch = useDispatch();
  const { loading,user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNo: "",
    password: "",
    role: "",
  });

const [profilePhoto ,setProfilePhoto] = useState(null)

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  // const changeFileHandler = (e) => {
  //   setInput({ ...input, file: e.target.files?.[0] });
  // };
  const handleProfilePhotoChange = (e) => {
    let file = e.target.files[0];
    if (file) {
      setProfilePhoto(file); // Update state with the selected file
      console.log("✅ File selected:", file);
    } else {
      console.log("❌ No file selected");
    }
  };


  const validateForm = () => {
    if (
      !input.email ||
      !input.fullName ||
      !input.phoneNo ||
      !input.password ||
      !input.role
    ) {
      // addToast("All fields are required!", "alert-error");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(input.email)) {
      dispatch(showToast({
        message: "Invalid Email Format!",
        type: "error",
      }))
      return false;
    }
    if (input.password.length < 6) {
      dispatch(showToast({
        message: "Password must be at least 6 characters long!",
        type: "error",
      }))
      return false;
    }
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNo", input.phoneNo);
    formData.append("password", input.password);
    formData.append("role", input.role);
    // if (input.file) {
    // }
    if (!profilePhoto) {
      console.log("Profile photo is not set in state!");
    } else {
      formData.append("profilePhoto", profilePhoto); // Append profilePhoto picture
      console.log("Profile photo selected:", profilePhoto);
    }
    for (let [key, value] of formData.entries()) {
      console.log(key,":", value);
    }
    console.log(
      input.fullName,
      input.email,
      input.phoneNo,
      input.password,
      input.role,
      input.profilePhoto
    );

    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        `${USER_API_END_POINT}/register`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      console.log(response.status);

      if (response.status === 200||201) {
        dispatch(showToast({
          message:"Signup successful!",
          type:"success"
        }))
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
dispatch(showToast({
  message:"Error! Signup failed.",
  type:"error"
})
)
      console.log(error);
    } finally {
      dispatch(setLoading(false));
      setTimeout(() => {
        dispatch(setLoading(false));
      });
    }
  };

  useEffect(()=>{
    if(user){
      navigate('/')
    }
  },[])
  return (
    <div className="mt-16">
      <Navbar />
      <div
        data-aos="zoom-in"
        className="flex mt-20 items-center justify-center max-w-7xl mx-auto"
      >
        <form
          data-aos="fade-up"
          onSubmit={submitHandler}
          className="flex flex-col gap-4 border border-gray-300 bg-base-100 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 mx-auto px-5 py-2 rounded-xl shadow-lg"
        >
          <h1
            data-aos="fade-down"
            data-aos-delay="500"
            className="font-bold md:text-3xl text-2xl w-full text-center mb-2"
          >
            Sign<span className="text-indigo-600">Up</span>
          </h1>

          {/* Email */}
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="email"
              className="flex items-center gap-2 text-sm font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-5 w-5 text-indigo-500"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              Email
            </label>
            <input
              type="text"
              id="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              className="input input-bordered w-full focus:outline-indigo-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Full Name */}
          <div className="flex flex-col items-start gap-1 w-full">
            <label
              htmlFor="fullName"
              className="flex items-center cursor-pointer gap-2 text-sm font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-5 w-5 text-indigo-500"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={input.fullName}
              onChange={changeEventHandler}
              className="input input-bordered w-full focus:outline-indigo-500"
              placeholder="Username"
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col items-start gap-1 w-full">
            <label
              htmlFor="phoneNo"
              className="cursor-pointer flex items-center gap-2 text-sm font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-5 w-5 text-indigo-500"
              >
                <path d="M11.885 12.226a16.977 16.977 0 0 1-8.111-8.111l1.516-1.516a.75.75 0 0 0 .156-.81l-1.5-3a.75.75 0 0 0-1.185-.21l-2.5 2.5a1.5 1.5 0 0 0-.293 1.56 19.48 19.48 0 0 0 9.562 9.562 1.5 1.5 0 0 0 1.56-.293l2.5-2.5a.75.75 0 0 0-.21-1.185l-3-1.5a.75.75 0 0 0-.81.156l-1.516 1.516Z" />
              </svg>
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNo"
              name="phoneNo"
              value={input.phoneNo}
              onChange={changeEventHandler}
              className="input input-bordered w-full focus:outline-indigo-500"
              placeholder="91+xxxxxxxx"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="password"
              className="flex items-center cursor-pointer gap-2 text-sm font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-5 w-5 text-indigo-500"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              className="input input-bordered w-full focus:outline-indigo-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Role Selection */}
          <div className="flex p-2 items-start justify-between lg:gap-6">
            <div className="flex gap-4 justify-around items-center  p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <input
                  id="student"
                  value="student"
                  type="radio"
                  name="role"
                  onChange={changeEventHandler}
                  checked={input.role === "student"}
                  className="radio radio-primary cursor-pointer"
                />
                <label htmlFor="student" className="text-sm cursor-pointer">
                  Student
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="recruiter"
                  value="recruiter"
                  type="radio"
                  name="role"
                  onChange={changeEventHandler}
                  checked={input.role === "recruiter"}
                  className="radio radio-primary cursor-pointer"
                />
                <label htmlFor="recruiter" className="text-sm cursor-pointer">
                  Recruiter
                </label>
              </div>
            </div>

            {/* File Upload */}
            <div className="relative flex flex-col items-start gap-1 w-full">
              <label
                htmlFor="profilePhoto"
                className="flex items-center cursor-pointer gap-2 text-sm font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-5 w-5 text-indigo-500 rounded-full border-2"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                {/* Upload */}
                 Profile Picture
              </label>
              {/* <input
            type="file"
            id="profilePhoto" */}
              <input
                type="file"
                id="profilePhoto"
                onChange={(e) => {
                  console.log("Selected file:", e.target.files[0]); // Debugging
                  setProfilePhoto(e.target.files[0]);
                }}// Use the new handler
                accept="image/*"
                // onChange={changeFileHandler}
                className="file-input h-8"
              />
            </div>
          </div>

          {loading ? (
            <button className="btn btn-accent text-white text-shadow w-full my-4 text-lg">
              <Loader2 className="mr-2 h-6 w-6  animate-spin"></Loader2>
              Please wait
            </button>
          ) : (
            <button
              type="submit"
              className="btn bg-indigo-700 hover:bg-indigo-500 border-0 w-full text-lg text-white "
            >
              Sign Up
            </button>
          )}

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-sm text-indigo-600 hover:text-accent transition-all"
            >
              Login
            </Link>
          </p>
        </form>
      </div>

    </div>
  );
}

export default Signup;
