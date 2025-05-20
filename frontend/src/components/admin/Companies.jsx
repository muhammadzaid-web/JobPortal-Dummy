import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import CompaniesTable from "./CompaniesTable";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "../../redux/companySlice";

function Companies() {
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setSearchCompanyByText(input));
    },[input]);
    return (

    <div>
        <Navbar/>
        <div className="max-w-6xl mx-auto my-20 px-10 lg:px-0">
            <div className="grid grid-cols-1 sm:flex md:item-center gap-10 justify-between">
                <input type='text'
                className="input input-bordered focus:outline-indigo-500 w-full )"
                placeholder="Filter by company name"
                onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={()=>navigate("/admin/companies/create")} className="bg-blue-500 w-full sm:w-1/3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">Add Company</button>
            </div>
            <CompaniesTable/>
        </div>
    </div>
  
  )
}

export default Companies;
