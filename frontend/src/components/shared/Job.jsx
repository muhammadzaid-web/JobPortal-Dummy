import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Job({job}) {

  const navigate= useNavigate()

  const createdAtDate = new Date(job.createdAt);
  const currentDate = new Date();
  const differenceInTime = currentDate - createdAtDate;
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

  return (
    <div 
    data-aos='fade-left'
    data-aos-delay='1000'
    className="border border-gray-200 p-4 rounded-lg shadow-md hover:shadow-xl hover:scale-103 transition-all hover:border-cyan-200 ">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{differenceInDays === 0 ? "Today": `${differenceInDays} days ago`}</p>
        <button size="icon" className="btn btn-ghost w-14 h-12 rounded-full">
          <Bookmark />
        </button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <button className="btn btn-ghost w-10 h-10 rounded-full">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-9 rounded-full ring ring-offset-2">
              <img src={`http://localhost:8000/uploads/${job.company.logo}`} />
            </div>
          </div>
        </button>
        <div>
          <h1 className="font-semibold text-base">{job?.company.name}</h1>
          <p className="text-indigo-500 text-sm">India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg">{job?.title}</h1>
        <p className="text-sm text-gray-500">{job?.description?.substring(0, 20)}...</p>
      </div>
      <div className="flex flex-wrap my-2 gap-2">
        <div className="badge border-none text-sm lg:text-xs bg-indigo-50 text-indigo-800 font-medium max-px-2 p-1 rounded-full">
          {job?.position} Positions
        </div>
        <div className="badge border-none text-sm lg:text-xs bg-red-50 text-red-800 font-medium  max-px-2 p-1 rounded-full">
          {job?.jobType}
        </div>
        <div className="badge border-none text-sm lg:text-xs bg-cyan-50 text-cyan-800 font-medium max-px-2 p-1 rounded-full">
          {job?.salary} LPA
        </div>
      </div>

      <div className="flex justify-start scale-90 gap-4 mt-6 items-center">
        <button onClick={() => navigate(`/description/${job?._id}`)} className="btn btn-outline">Details</button>
        <button className="btn btn-primary not-hover:border-white hover:btn-accent hover:text-white">
          Save for later
        </button>
      </div>
    </div>
  );
}

export default Job;
