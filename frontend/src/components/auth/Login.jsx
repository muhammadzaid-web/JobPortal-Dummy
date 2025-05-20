import { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../redux/authSlice";
import { Loader2 } from "lucide-react";
import { showToast } from "../../redux/toastSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.data.success) {
        dispatch(setUser(response.data.user));
        dispatch(
          showToast({ message: `${response.data.message}`, type: "success" })
        );
        setTimeout(() => {
          navigate("/");
        }, 4000);
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
      // console.log(error.);
      dispatch(
        showToast({
          message: "Something went wrong. Please try again later.",
          type: "error",
        })
      );
      // addToast("Error! Login failed.", "alert-error");
    } finally {
      dispatch(setLoading(false));
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 3000);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div
        data-aos="zoom-in"
        className="flex mt-20 items-center justify-center max-w-7xl mx-auto"
      >
        <form
          data-aos="fade-up"
          onSubmit={submitHandler}
          className="flex flex-col gap-6 border border-gray-300 bg-base-100 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 mx-auto p-6 rounded-2xl shadow-lg"
        >
          <h1
            data-aos="fade-down"
            data-aos-delay="500"
            className="font-bold md:text-3xl text-2xl w-full text-center mb-2"
          >
            Log<span className="text-indigo-600">In</span>
          </h1>

          {/* Email */}
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="email"
              className="flex items-center gap-2 text-sm font-medium cursor-pointer"
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

          {/* Password */}
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="password"
              className="flex items-center gap-2 text-sm font-medium cursor-pointer"
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

          {/* Role */}
          <div className="flex justify-start gap-4 items-center  p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <input
                id="student"
                value="student"
                type="radio"
                name="role"
                onChange={changeEventHandler}
                checked={input.role === "student"}
                className="radio radio-primary"
              />
              <label htmlFor="student" className="text-sm cursor-pointer">
                Student
              </label>
            </div>
            <div className="flex items-center  gap-2">
              <input
                id="recruiter"
                value="recruiter"
                type="radio"
                name="role"
                onChange={changeEventHandler}
                checked={input.role === "recruiter"}
                className="radio radio-primary"
              />
              <label htmlFor="recruiter" className="text-sm cursor-pointer">
                Recruiter
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="w-full">
            {loading ? (
              <button className="btn btn-accent w-full text-lg">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Please wait...
              </button>
            ) : (
              <button
                type="submit"
                className="btn bg-indigo-600 hover:bg-indigo-500 w-full text-lg text-white shadow-md"
              >
                Log In
              </button>
            )}
          </div>

          {/* Signup Link */}
          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 hover:text-accent transition-all"
            >
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
