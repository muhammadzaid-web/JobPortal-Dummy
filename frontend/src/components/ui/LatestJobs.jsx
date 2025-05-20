import { useSelector } from "react-redux";
import JobCard from "./JobCard";

function LatestJobs() {

  const {allJobs} = useSelector((store)=>store.job);
  
  return (
    <div className="max-w-6xl mx-auto my-20 ">
      <h1 className="text-4xl font-bold mb-4 px-6 xl:px-0">
        Latest & Top <span className="text-cyan-500">Job Openings</span>
      </h1>
      {/* job cards */}
      <div className="grid grid-cols-1 min sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 lg:p-0">
        {allJobs <= 0 ? (
          <span>EMPTY!!</span>
        ) : (
          allJobs?.slice(0,6)
            .map((job) => <JobCard key={job._id} job={job}/>)
        )}
      </div>
    </div>
  );
}

export default LatestJobs;
