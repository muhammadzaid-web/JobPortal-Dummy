import { EyeIcon, MoreHorizontal, Pen } from "lucide-react";
import { useSelector } from "react-redux";
import useGetAllCompanies from "../../hooks/useGetAllCompanies";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Job from "../shared/Job";

function AdminJobsTable() {
const {allAdminJobs,searchJobByText } = useSelector(store => store.job);
const [filterJobs, setFilterJobs] = useState(allAdminJobs);
const navigate = useNavigate();
useEffect(()=>{
    const filteredJobs = allAdminJobs.length >= 0 && allAdminJobs.filter((job)=>{
        if(!searchJobByText){
            return true
        };
        return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.location?.toLowerCase().includes(searchJobByText.toLowerCase());  

    });
    setFilterJobs(filteredJobs);
},[allAdminJobs,searchJobByText])

  return (
    <div className="py-10">
      <hr />
      <h1 className="heading text-2xl font-bold text-center mb-8">
        A list of your registered Jobs
      </h1>
      <div
        className="overflow-x-auto  max-w-6xl mx-auto rounded-2xl border border-gray-400 shadow-lg p-4 mt-8"
        data-aos="flip-up"
        data-aos-delay="1000"
      >
        <table className="table-auto w-full text-sm md:text-base">
          <thead>
            <tr className="bg-gray-800 text-md lg:text-xl text-cyan-700">
              <th className="py-3 px-2 sm:px-4 text-left">Company</th>
              <th className="py-3 px-2 sm:px-4 text-center sm:text-left">Role</th>
              <th className="py-3 px-2 sm:px-4 text-left">Date</th>
              <th className="py-3 px-2 sm:px-4 hidden md:table-cell text-center">Positions</th>
              <th className="py-3 px-2 sm:px-4 hidden md:table-cell text-center">Location</th>
              <th className="py-3 px-2 sm:px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {allAdminJobs.length<=0 ? <span>Jobs not found</span> :
            filterJobs?.map(job =>(
                <tr key={job._id} className="hover:bg-gray-700/30 border-b-1 border-gray-800 transition-all">
                <td className="py-3 px-2 sm:px-4 text-left">
                  <div className="avatar grid">
                    { job?.company?.logo && <div className="w-10 sm:w-12 rounded-full ring-primary ring-offset-base-100 ring ring-offset-2">
                      <img src={`http://localhost:8000/uploads/${job.company.logo}`} alt={job.company.name} className="w-10"/>
                      </div>}
                      {job?.company?.name}
                      </div>
                </td>
                <td className="py-3 px-2 sm:px-4 text-left">{job.title}</td>
                <td className="py-3 px-2 sm:px-4 text-left">{new Date(job.createdAt).toLocaleDateString()}</td>
                <td className="py-3 px-2 sm:px-4 hidden md:table-cell text-center">{job.position}</td>
                <td className="py-3 px-2 sm:px-4 hidden md:table-cell text-center">{job.location}</td>
                <td className="py-3 px-2 lg:px-4 text-right">
                  <div className="dropdown dropdown-left">
                    <div tabIndex={0} role="button" className="cursor-pointer">
                      <MoreHorizontal />
                    </div>
                    <div
                      tabIndex={0}
                      className="dropdown-content menu bg-base-200 rounded-box z-[1] w-32 px-6 py-2 gap-2 mt-3 shadow-md"
                      >
                      <div className="flex items-center justify-start gap-4 cursor-pointer " onClick={()=> navigate(`/admin/company/${job._id}`)}>
                        <Pen className="w-5"/>
                        <p className="text-md">Edit</p>
                      </div>
                      <div className="flex items-center justify-start gap-4 cursor-pointer " onClick={()=> navigate(`/admin/jobs/${job._id}/applicants`)}>
                        <EyeIcon className="w-5"/>
                        <p className="text-md">Applicant</p>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              ))}
        
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminJobsTable;
