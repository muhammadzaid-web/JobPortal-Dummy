import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";
import ScrollToTopButton from "../components/shared/scrollToTop";
import FilterJobs from "../components/ui/FilterJobs";
import Job from "../components/shared/Job";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Jobs() {
  const { allJobs, searchedQuery } = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
      if (searchedQuery) {
          const filteredJobs = allJobs.filter((job) => {
              return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                  job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                  job.location.toLowerCase().includes(searchedQuery.toLowerCase())
          })
          setFilterJobs(filteredJobs)
          
      } else {
          setFilterJobs(allJobs)
      }

  }, [allJobs, searchedQuery]);

  return (
    <div>
      <style>
        {`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;  
          scrollbar-width: none;  
        }
        `}
      </style>

      <Navbar />

      <div data-aos='zoom-out-up' className="max-w-[72rem] mx-auto mb-20  pt-30 px-2 md:px-4 overflow-y-hidden rounded-b-[90px] border-2 border-dashed border-t-0 border-gray-500">
        {/* Flex Layout */}
        <div className="flex flex-col md:flex-row gap-5">
          {/* Filters */}
          <div data-aos='fade-right' data-aos-delay='500' className="w-full md:max-w-[20%]">
            <FilterJobs />
          </div>

          {/* Job Cards */}
          {filterJobs.length <= 0 ? (
            <div className="text-center h-[75vh] py-20 animate-pulse flex-1 text-2xl md:text-3xl font-bold text-red-600">
              Jobs Not Found
            </div>
          ) : (
            <div className="flex-1 h-screen overflow-y-scroll scrollbar-hide ">
              <div data-aos='zoom-in-down' data-aos-delay='500' className="p-2 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                {filterJobs.map((job) => (
                  <div key={job._id}>
                    <Job  job={job} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

export default Jobs;
