import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { registerCompany } from "../../../../backend/controllers/company.controller";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import { useState } from "react";
import { setSingleCompany } from "../../redux/companySlice";
import { useDispatch } from "react-redux";
import { showToast } from "../../redux/toastSlice";

function CompanyCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState();

  const registerNewCompany = async () => {
    try {
      const response = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        {
          companyName,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if(response?.data?.success){
        dispatch(showToast({
          message: `Company registered successfully ${companyName}`,
          type: "success",
        }))
        dispatch(setSingleCompany(response?.data?.company))
        setTimeout(() => {
            const companyId = response?.data?.company?._id;
            navigate(`/admin/company/${companyId}`);
        },2500)
    }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto pt-20 px-4 sm:px-10 lg:px-0 ">
        <div className="my-10">
          <h1 className="text-2xl md:text-3xl font-bold">Your Company Name</h1>
          <p className="text-gray-500 text-sm sm:text-md">
            What would you like to give your company name ? You can change this
            later.
          </p>
        </div>
        <label htmlFor="companyName" className="block mb-2 text-sm">
          Company Name
        </label>
        <input
          type="text"
          id="companyName"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter your company name"
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <div className="my-4 flex gap-4">
          <button
            onClick={() => navigate("/admin/companies")}
            className="btn btn-outline font-medium hover:btn-ghost btn-error "
          >
            Cancel
          </button>
          <button onClick={registerNewCompany} className="btn btn-primary w-20">
            Continue
          </button>
        </div>
      </div>

    </div>
  );
}

export default CompanyCreate;
