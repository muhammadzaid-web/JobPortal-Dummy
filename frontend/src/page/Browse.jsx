import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";
import ScrollToTopButton from "../components/shared/scrollToTop";
import Job from "../components/shared/Job";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setSearchedQuery } from "../redux/jobSlice";
import useGetAllJobs from "../hooks/useGetAllJobs";

function Browse() {
    useGetAllJobs();
    const {allJobs} = useSelector(store=>store.job);
    const dispatch = useDispatch();
    useEffect(()=>{
        setTimeout(()=>{
            // clear the search query after 3 seconds
            dispatch(setSearchedQuery(""));
        },4000)
    })
    return ( 
        <div>
        <Navbar/>
        <div
        data-aos='zoom-out-up'
        className="max-w-6xl my-0 py-26 border-gray-500 border-y-0 border-2 border-dashed mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-xl font-semibold">Search Results ({allJobs.length})</h1>
            <div data-aos='zoom-in-down' data-aos-delay='400' className="grid grid-cols-1 gap-4 mt-10 sm:grid-cols-2 lg:grid-cols-3 ">
                {allJobs.map((job)=>(
                    <Job key={job._id} job={job}/>
                ))}
            </div>
        </div>
        <Footer/>
        <ScrollToTopButton/>
        </div>
     );
}

export default Browse;