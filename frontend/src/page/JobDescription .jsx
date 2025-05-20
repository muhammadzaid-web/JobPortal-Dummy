import { useParams } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { setSingleJob } from "../redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "../utils/constant";
import { showToast } from "../redux/toastSlice";

function JobDescription() {
  const { user } = useSelector((store) => store.auth);
  const { companies } = useSelector((store) => store.company);
  const { allJobs } = useSelector((store) => store.job);

  const params = useParams();
  const singleJob = allJobs.find((job) => job._id === params.id);
  // const [singleJob, setSingleJob] = useState(null);
  const dispatch = useDispatch(); // ✅ useDispatch must be at top-level of hook
  const isInitiallyApplied = singleJob?.applications.some(
    (applications) => applications.applicant === user._id
  );
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);
  const jobId = params.id;
  console.log(singleJob);

  const applyJobHandler = async () => {
    try {
      const response = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {}, // Empty body if not sending data
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        dispatch(
          showToast({
            message: "Applied Successfully",
            type: "success",
          })
        );
      }
    } catch (error) {
      if (error.response) {
        // Server responded with error status (4xx, 5xx)
        dispatch(
          showToast({
            message: "Application failed - please try again",
            type: "error",
          })
        );
      } else if (error.request) {
        // Request was made but no response
        dispatch(showToast({
          message:"Network error - please check your connection",
          type:"error"
        }))
      } else {
        // Other errors
dispatch(showToast({
  message:"Application failed - please try again",
  type:"error"
}))
      }
      console.error("Application error:", error);
    }
  };

  useEffect(() => {
    const fetchSingleJobs = async () => {
      try {
        const response = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (response.data.success) {
          dispatch(setSingleJob(response.data.job));
          setIsApplied(
            response.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
          console.log(response.data.job);
        }
      } catch (error) {
        console.error(error);
      } finally {
        console.log(response.data.message);
      }
    };

    fetchSingleJobs();
  }, [jobId, dispatch, user?._id]);
  let companyLogo;
  companies.map((company) =>
    company._id === singleJob.company._id ? companyLogo == company.logo : ""
  );

  return (
    <div className="max-w-6xl mx-auto  mt-20 lg:mt-30">
      <Navbar />
      <div className="p-10 lg:p-0">
        <div className="flex  justify-between items-center sm:mx-auto">
          <div>
            <div className="avatar">
              <div className="ring-accent ring-offset-base-100 w-12 rounded-full ring ring-offset-4">
                <img
                  alt="user-avatar"
                  src={`http://localhost:8000/uploads/${singleJob?.company?.logo}`}
                />
              </div>
              <h1 className="font-bold lg:text-3xl mx-4">{singleJob?.title}</h1>
            </div>
            <div className="flex flex-wrap items-center gap-2 my-6">
              <div className="badge border-none font-bold text-sm lg:text-xs bg-indigo-50 text-indigo-800 medium max-px-2 p-1 rounded-full">
                {singleJob?.position} Positions
              </div>
              <div className="badge border-none font-bold text-sm lg:text-xs bg-red-50 text-red-800 font max-px-2 p-1 rounded-full">
                {singleJob?.jobType}
              </div>
              <div className="badge border-none font-bold text-sm lg:text-xs bg-cyan-50 text-cyan-800 font max-px-2 p-1 rounded-full">
                {singleJob?.salary} LPA
              </div>
            </div>
          </div>
          <button
            onClick={isApplied ? null : applyJobHandler}
            className={`btn font-semibold text-white rounded-lg  ${
              isApplied
                ? `btn-neutral hover:bg-slate-500 hover:text-black`
                : `btn-info hover:btn-accent`
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </button>
        </div>
        <h1 className="pt-6 border-b-2 border-b-gray-300  font-medium">
          Job Description
        </h1>
        <div className="my-6">
          <h1 className="my-2 text-xl">
            Role :{" "}
            <span className="text-lg text-gray-400">{singleJob?.title}</span>
          </h1>
          <h1 className="my-2 text-xl">
            Location :{" "}
            <span className="text-lg text-gray-400">{singleJob?.location}</span>
          </h1>
          <h1 className="my-2 text-xl">
            Description :{" "}
            <span className="text-lg text-gray-400">
              {singleJob?.description}
            </span>
          </h1>
          <h1 className="my-2 text-xl">
            Experience :{" "}
            <span className="text-lg text-gray-400">
              {singleJob?.experience} yr
            </span>
          </h1>
          <h1 className="my-2 text-xl">
            Salary :{" "}
            <span className="text-lg text-gray-400">
              {singleJob?.salary} LPA
            </span>
          </h1>
          <h1 className="my-2 text-xl">
            Total Applicants :{" "}
            <span className="text-lg text-gray-400">
              {singleJob?.applications.length}
            </span>
          </h1>
          <h1 className="my-2 text-xl">
            Job Created :{" "}
            <span className="text-lg text-gray-400">
              {singleJob?.createdAt.split("T")[0]}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default JobDescription;
