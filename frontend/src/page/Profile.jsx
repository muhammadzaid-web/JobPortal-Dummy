import { Mail, Pen, Phone, User2Icon } from "lucide-react";
import Navbar from "../components/shared/Navbar";
import { useSelector } from "react-redux";
import AppliedJobsTable from "../components/ui/AppliedJobsTable";
import { useState } from "react";
import UpdateProfileDialog from "../components/ui/UpdateProfileDialog";
import useGetAppliedJob from "../hooks/useGetAppliedJob";

function Profile() {
  const { user } = useSelector((store) => store.auth);
  const skills = user.profile.skills;
  // const skillsArray = [
  //   "HTML",
  //   "CSS",
  //   "JavaScript",
  //   "React",
  //   "Node.js",
  //   "MongoDB",
  //   "Express.js",
  // ];
  const isResume = true;

  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);
useGetAppliedJob();
  return (
    <div>
      <div className={`${isOpen == true ? 'cursor-none' : 'cursor-default'}`}>
      <Navbar />
      <div
        data-aos="fade-down"
        className="max-w-4xl mx-auto mt-30 mb-10 p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg border-t border-gray-200 h-fit"
      >
        <div className="flex flex-col items-center sm:flex-row justify-between sm:items-start gap-4">
          {/* User Info Section */}
          <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
            <div className="avatar">
              <div className="ring-primary ring-offset-base-100 w-20 h-20 sm:w-24 sm:h-24 rounded-full ring ring-offset-2">
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
            <div
              className="text-center sm:text-left"
              data-aos="fade-right"
              data-aos-delay="500"
            >
              <h1 className="text-lg sm:text-2xl font-semibold text-indigo-500">
                {user ? user.fullName.toUpperCase() : "Full Name"}
              </h1>
              <p className="text-sm sm:text-md text-base-content">
                {user.profile.bio? user.profile.bio : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae velit, facilis recusandae saepe accusamus a."}
              </p>
            </div>
          </div>

          {/* Edit Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="btn btn-sm btn-ghost rounded-full hover:text-cyan-400 scale-75 sm:scale-100"
          >
            <Pen />
          </button>
        </div>

        {/* Contact Details */}
        <div className="flex flex-col gap-3 mt-6 text-sm sm:text-base">
          <div
            data-aos="fade-right"
            data-aos-delay="1100"
            className="flex items-center gap-3"
          >
            <Mail />
            <span>{user ? user.email : "xyzmail"}</span>
          </div>
          <div
            data-aos="fade-right"
            data-aos-delay="1300"
            className="flex items-center gap-3"
          >
            <Phone />
            <span>{user ? user.phoneNo : "123456676767"}</span>
          </div>
          <div
            data-aos="fade-right"
            data-aos-delay="1500"
            className="flex items-center gap-3"
          >
            <User2Icon />
            <span>{user ? user.role : "Student"}</span>
          </div>
        </div>

        {/* Skills */}
        <div
          className="my-6 flex flex-col gap-2"
          data-aos-delay="1700"
          data-aos="fade-down"
        >
          <h1 className="text-md sm:text-xl text-cyan-500 font-bold">
            Skills :
          </h1>
          <div className="flex gap-2 flex-wrap">
            {skills.length !== 0 ? (
              skills.map((skill, index) => (
                <div
                  key={index}
                  className="badge badge-info font-bold border-none text-xs sm:text-sm"
                  data-aos="zoom-out"
                  data-aos-delay="2700"
                >
                  {skill}
                </div>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>

        {/* Resume */}
        <div className="flex flex-col gap-1 text-sm sm:text-base">
          <label className="font-bold">Resume :</label>
          {isResume ? (
            <a
              target="_blank"
              href={user?`http://localhost:8000/${user.profile.resume}`:"https://www.youtube.com/watch?v=F5EYXc91Cpo"}
              className="text-blue-500 hover:underline"
            >
              {user.fullName}'s Resume'
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto mb-6 px-2">
        <h1 className="sm:text-2xl text-lg m-2 font-bold">Applied Jobs</h1>
        {/* applied job table here */}
        <AppliedJobsTable />
      </div>
      </div>
      <UpdateProfileDialog
        open={isOpen}
        setOpen={setIsOpen}
      ></UpdateProfileDialog>
    </div>
  );
}

export default Profile;
