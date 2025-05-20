import { useSelector } from "react-redux";

function AppliedJobsTable() {
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <div>
      <div
        className="overflow-x-auto bg-white/10 max-w-4xl mx-auto rounded-2xl border border-gray-400 shadow-lg p-4 mt-8"
        data-aos="flip-up"
        data-aos-delay="1000"
      >
        <table className="table-auto w-full text-sm md:text-base">
          <thead>
            <tr className="bg-gray-800 text-md lg:text-xl text-cyan-700">
              <th className="py-3 px-2 sm:px-4 text-left">Job Role</th>
              <th className="py-3 px-2 sm:px-4 text-left">Company</th>
              <th className="py-3 px-2 sm:px-4 text-left">Date</th>
              <th className="py-3 px-2 sm:px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {allAppliedJobs?.map((job, id) => (
              <tr key={id} className="hover:bg-gray-700/30 transition-all">
                <td className="py-3 px-2 lg:px-4">{job.job.title}</td>
                <td className="py-3 px-2 lg:px-4 flex gap-2"><img className="w-8 h-8 rounded-full ring-offset-2 ring-primary ring-1" src={`http://localhost:8000/uploads/${job.job.company.logo}` } />{job.job.company.name}</td>
                <td className="py-3 px-2 lg:px-4">
                  {job.createdAt.slice(0, 10)}
                </td>
                <td className={`py-3 px-2 lg:px-4 text-right ${job.status === "accepted" ? "animate-bounce " : job.status === "rejected"? "animate-pulse" : ""}`}>
                  <span
                    className={`badge  ${
                      job.status === "accepted"
                        ? "badge-success text-black "
                        : job.status === "rejected"
                        ? "badge-error text-black"
                        : "badge-neutral text-white"
                    }  px-3 py-1 rounded-full font-medium shadow-md`}
                  >
                    {job.status.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AppliedJobsTable;
