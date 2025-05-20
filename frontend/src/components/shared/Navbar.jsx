// import { LogOutIcon, UserIcon } from "lucide-react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";

// function Navbar() {

//   // const { user } = useSelector(store => store.auth);
//   // console.log(user);
//   const user = true;
//   return (
//     <div className="bg-transparent backdrop:filter backdrop-blur-md fixed top-0 left-0 right-0 z-50">
//       <div className="flex items-center justify-between mx-auto max-w-6xl h-16 ">
//         <div>
//           <h1 className="text-3xl font-bold">
//             Job<span className=" text-cyan-500">Portal</span>
//           </h1>
//         </div>
//         <div className="flex gap-10 items-center">
//           <ul className="flex font-medium gap-8">
//             <Link to="/">
//               <li className="cursor-pointer hover:text-indigo-500 transition-all">
//                 Home
//               </li>
//             </Link>
//             <Link to="/jobs">
//               <li className="cursor-pointer hover:text-indigo-500 transition-all">
//                 Jobs
//               </li>
//             </Link>
//             <Link to="/browse">
//               <li className="cursor-pointer hover:text-indigo-500 transition-all">
//                 Browse
//               </li>
//             </Link>
//           </ul>
//           {!user ? (
//             <div className="flex gap-2">
//               <Link to="/signup">
//                 <button className="not-hover:text-primary btn btn-outline btn-primary">
//                   Sign Up
//                 </button>
//               </Link>
//               <Link to="/login">
//                 <button className="btn bg-cyan-500 hover:bg-cyan-600 text-white border-cyan-500 hover:border-cyan-600">
//                   Log In
//                 </button>
//               </Link>
//             </div>
//           ) : (
//             <div>
//               <div className="dropdown dropdown-end">
//                 <div tabIndex={0} role="button" className="cursor-pointer">
//                   <div className="avatar">
//                     <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
//                       <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
//                     </div>
//                   </div>
//                 </div>
//                 <ul
//                   tabIndex={0}
//                   className="dropdown-content menu bg-base-200 rounded-box z-[1] w-56 p-2 mt-3 shadow-md"
//                 >
//                   <div>
//                     <div className="p-2 flex gap-2">
//                       <div className="avatar">
//                         <div className="ring-primary ring-offset-base-100 w-9 h-9 rounded-full ring ring-offset-2">
//                           <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
//                         </div>
//                       </div>
//                       <div>
//                         <h1 className="font-medium">{user.fullName}</h1>
//                         <p className="text-md text-gray-500">{user.email}</p>
//                       </div>
//                     </div>
//                   </div>

//                       <Link to='/profile'>
//                   <li>
//                     <div className=" p-2 text-sm flex  gap-3 text-gray-700 cursor-pointer">

//                       <UserIcon />
//                       <button className="w-fit border border-transparent hover:border-b-gray-600">
//                         Veiw Profile
//                       </button>

//                     </div>
//                   </li>
//                       </Link>
//                       <Link to='/logout'>
//                   <li>
//                     <div className=" p-2 text-sm flex  gap-3 text-gray-700 cursor-pointer">
//                       <LogOutIcon />
//                       <button className="w-fit border border-transparent hover:border-b-gray-600">
//                         Log out
//                       </button>
//                     </div>
//                   </li>
//                       </Link>
//                 </ul>
//               </div>
//               {/*  */}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;

import axios from "axios";
import { LogOutIcon, UserIcon, MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../../utils/constant";
import { setUser } from "../../redux/authSlice";
import { showToast } from "../../redux/toastSlice";

function Navbar() {
  // Simulate user for demo
  // const user = true;
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
dispatch(showToast({
  message:"Logout Successfully",
  type:"success"
}))
        setTimeout(() => {
          dispatch(setUser(null));
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      dis[asyncThunkCreator(showToast, {
       message:"Did't logout",
       type:"error"
      }
      )]
    }
  };

  // Mobile menu toggle state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-transparent backdrop:filter backdrop-saturate-200 backdrop-blur-sm  fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between mx-auto max-w-6xl h-16 px-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Job<span className=" text-cyan-500">Portal</span>
          </h1>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-10 items-center">
          <ul className="flex font-medium gap-8">
            {user && user.role === "recruiter" ? (
              <>
                <Link to="/admin/companies">
                  <li className="cursor-pointer hover:text-indigo-500 transition-all">
                    Companies
                  </li>
                </Link>
                <Link to="/admin/jobs">
                  <li className="cursor-pointer hover:text-indigo-500 transition-all">
                    Jobs
                  </li>
                </Link>
              </>
            ) : (
              <>
                <Link to="/">
                  <li className="cursor-pointer hover:text-indigo-500 transition-all">
                    Home
                  </li>
                </Link>
                <Link to="/jobs">
                  <li className="cursor-pointer hover:text-indigo-500 transition-all">
                    Jobs
                  </li>
                </Link>
                <Link to="/browse">
                  <li className="cursor-pointer hover:text-indigo-500 transition-all">
                    Browse
                  </li>
                </Link>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex gap-2">
              <Link to="/signup">
                <button className="btn btn-outline btn-primary">Sign Up</button>
              </Link>
              <Link to="/login">
                <button className="btn bg-cyan-500 hover:bg-cyan-600 text-white border-cyan-500 hover:border-cyan-600">
                  Log In
                </button>
              </Link>
            </div>
          ) : (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="cursor-pointer">
                <div className="avatar">
                  <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
                    <img
                      src={
                        user
                          ? `http://localhost:8000/${user.profile.profilePhoto}`
                          : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      }
                      alt="User Avatar"
                    />
                  </div>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-200 rounded-box z-[1] w-56 p-2 mt-3 shadow-md"
              >
                <div className="p-2 flex gap-2">
                  <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-9 h-9 rounded-full ring ring-offset-2">
                      <img
                        src={
                          user
                            ? `http://localhost:8000/${user.profile.profilePhoto}`
                            : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        }
                        alt="User Avatar"
                      />
                    </div>
                  </div>
                  <div>
                    <h1 className="font-medium">{user.fullName}</h1>
                    <p className="text-md text-gray-500">{user.email}</p>
                  </div>
                </div>

                {user && user.role === "student" && (
                  <Link to="/profile">
                    <li>
                      <div className="p-2 text-sm flex gap-3 cursor-pointer">
                        <UserIcon />
                        <button className="w-fit border border-transparent hover:border-b-gray-600">
                          View Profile
                        </button>
                      </div>
                    </li>
                  </Link>
                )}

                <li>
                  <div
                    onClick={logoutHandler}
                    className="p-2  text-sm flex gap-3 cursor-pointer"
                  >
                    <LogOutIcon />
                    <button className="w-fit border border-transparent hover:border-b-gray-600">
                      Log out
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Hamburger menu for mobile */}
        <div className="md:hidden">
        <label className=" swap swap-rotate">
  {/* this hidden checkbox controls the state */}
  <input type="checkbox" 
  onClick={() => setIsMenuOpen(!isMenuOpen)}/>

  {/* hamburger icon */}
<MenuIcon className="swap-off fill-current" />

  {/* close icon */}
<XIcon className="swap-on fill-current" />

</label>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-base-200/90 px-4 rounded-b-2xl shadow-accent-content overflow-hidden transition-all duration-1000 ease-in-out ${
          isMenuOpen
            ? "max-h-[1000px] opacity-100 shadow-2xl max-w-full"
            : "max-w-0 shadow-none max-h-0 opacity-0"
        }`}
      >
        <ul className="flex bg-linear mt-10 flex-col">
          {user?.role !== "recruiter" && (
            <>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                <li className="p-2 mb-2 cursor-pointer active:bg-gray-500/50 rounded-xl transition-all">
                  Home
                </li>
              </Link>
              <Link to="/jobs" onClick={() => setIsMenuOpen(false)}>
                <li className="p-2 mb-2 cursor-pointer active:bg-gray-500/50 rounded-xl transition-all">
                  Jobs
                </li>
              </Link>
              <Link to="/browse" onClick={() => setIsMenuOpen(false)}>
                <li className="p-2 mb-2 cursor-pointer active:bg-gray-500/50 rounded-xl transition-all">
                  Browse
                </li>
              </Link>
            </>
          )}
          {user?.role === "recruiter" && (
            <>
              <Link to="/admin/companies" onClick={() => setIsMenuOpen(false)}>
                <li className="p-2 mb-2 cursor-pointer active:bg-gray-500/50 rounded-xl transition-all">
                  Companies
                </li>
              </Link>
              <Link to="/admin/jobs" onClick={() => setIsMenuOpen(false)}>
                <li className="p-2 mb-2 cursor-pointer active:bg-gray-500/50 rounded-xl transition-all">
                  Jobs
                </li>
              </Link>
            </>
          )}

          {!user ? (
            <div className="flex justify-end pb-4 gap-2 w-full">
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                <button className="px-10 sm:px-4 btn btn-outline btn-primary">
                  Sign Up
                </button>
              </Link>
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <button className="px-10 sm:px-4 btn bg-cyan-500 hover:bg-cyan-600 text-white border-cyan-500 hover:border-cyan-600">
                  Log In
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 items-start">
                <div className="avatar">
                  <div className="ring-primary ring-offset-base-100 w-14 h-14 rounded-full ring ring-offset-2">
                    <img
                      src={
                        user
                          ? `http://localhost:8000/${user.profile.profilePhoto}`
                          : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      }
                      alt="User Avatar"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <h1 className="font-semibold text-xl">{user.fullName}</h1>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>

              {user && user.role === "student" && (
                <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                  <button className="btn btn-outline w-full">
                    <UserIcon /> View Profile
                  </button>
                </Link>
              )}

              <button
                onClick={logoutHandler}
                className="btn btn-outline w-full mb-8"
              >
                <LogOutIcon /> Log Out
              </button>
            </div>
          )}
        </ul>
      </div>

    </div>
  );
}

export default Navbar;
