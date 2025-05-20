import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import AdminJobsTable from "./AdminJobsTable";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchJobByText } from "../../redux/jobSlice";
import UseGetAllAdminJobs from "../../hooks/UseGetAllAdminJobs";

function AdminJobs() {
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
UseGetAllAdminJobs();
    useEffect(()=>{
        dispatch(setSearchJobByText(input));
    },[input]);
    return (

    <div>
        <Navbar/>
        <div className="max-w-6xl mx-auto my-20 px-10 lg:px-0">
            <div className="grid grid-cols-1 sm:flex md:item-center gap-10 justify-between">
                <input type='text'
                className="input input-bordered focus:outline-indigo-500 w-full )"
                placeholder="Filter by Job Role / Location / Company . ."
                onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={()=>navigate("/admin/jobs/create")} className="bg-blue-500 w-full sm:w-1/3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">new Jobs</button>
            </div>
            <AdminJobsTable/>
        </div>
    </div>
  
  )
}

export default AdminJobs;
