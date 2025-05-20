// function JobCard() {
//   return (
//     <div className="p-10 border bg-white/15 border-gray-100 rounded-lg shadow-md hover:shadow-lg hover:scale-103 cursor-pointer transition-all shadow-cyan-500">
//       <div>
//         <h1 className="text-lg font-bold">Company Name</h1>
//         <p className="text-gray-500 text-sm">India</p>
//       </div>
//       <div>
//         <h1 className="text-2xl font-bold my-2">Job Title</h1>
//         <p className="text-gray-600 text-md">
//           Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis,
//           perspiciatis.
//         </p>
//       </div>
//       <div className="flex gap-2 mt-4">
//         <div className="badge text-indigo-600 border-gray-300 bg-transparent font-semibold gap-2">
//           12 Positions
//         </div>
//         <div className="badge text-red-700 border-gray-300 bg-transparent font-semibold gap-2">
//           Job Type
//         </div>
//         <div className="badge text-cyan-700 border-gray-300 bg-transparent font-semibold gap-2">
//           10 LPA
//         </div>
//       </div>
//     </div>
//   );
// }

import { useNavigate } from "react-router-dom";

// export default JobCard;
function JobCard({ job }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/description/${job?._id}`)}
      data-aos="zoom-in"
      data-aos-once="true"
      data-aos-delay="1100"
      className="p-6 sm:p-8 rounded-lg shadow-md border border-gray-200 transition-all duration-500 delay-200 ease-in-out hover:shadow-lg hover:border-cyan-200 cursor-pointer"
    >
      <div className="mb-4 flex gap-4">
        <div className="w-14 h-14 flex items-center justify-center rounded-full ring-primary ring-offset-base-100 ring ring-offset-2 overflow-hidden">
          <img
            className="w-14 h-14 rounded-full"
            src={`http://localhost:8000/uploads/${job.company.logo}`}
            alt="company logo"
          />
        </div>
        {/* { job?.company?.logo && <div className="w-10 sm:w-12 rounded-full ">
                      <img src={`http://localhost:8000/uploads/${job.company.logo}`} alt={job.company.name} className="w-10"/>
                      </div>} */}
        <div>
          <h1 className="font-semibold text-xl"> {job?.company?.name} </h1>
          <p className="text-indigo-500 text-sm">India</p>
        </div>
      </div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-content-2">{job?.title} </h1>
        <p className="text-gray-500 text-md">
          {job?.description?.substring(0, 150)}...
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <div className="badge border-none text-sm bg-indigo-100 text-indigo-800 font-semibold px-3 py-1 rounded-full">
          {job?.position} Positions
        </div>
        <div className="badge border-none text-sm bg-red-100 text-red-800 font-semibold px-3 py-1 rounded-full">
          {job?.jobType}
        </div>
        <div className="badge border-none text-sm bg-cyan-100 text-cyan-800 font-semibold px-3 py-1 rounded-full">
          {job?.salary} LPA
        </div>
      </div>
    </div>
  );
}

export default JobCard;
