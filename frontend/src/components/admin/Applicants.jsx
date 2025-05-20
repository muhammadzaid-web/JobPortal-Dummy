import { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../../utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "../../redux/applicationSlice";
import { setSingleJob } from "../../redux/jobSlice";

function Applicants() {
    const params = useParams();
    const dispatch = useDispatch();
    const {applicants} = useSelector(store => store.application);

    // useEffect(() => {
  //   const fetchAllApplicants = async () => {
  //       try {
  //           const response = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`,{withCredentials:true});
  //           if(response.data.success){
  //               console.log(response.data)
  //               dispatch(setSingleJob(response.data.job))
                
  //               dispatch(setAllApplicants(response.data.job.applications))
  //               console.log(response.data.job.applications.map((applicant) => applicant.email))
  //           }
  //       } catch (error) {
  //           console.log(error);
            
  //       }
  //   }
  //   // console.log(allApplicants);
  //   fetchAllApplicants();
  // }, []);
  useEffect(() => {
    const fetchAllApplicants = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
            dispatch(setAllApplicants(res.data.job));
        } catch (error) {
            console.log(error);
        }
    }
    fetchAllApplicants();
}, []);
  
console.log(applicants);
const addToast = (message, type) => {
  const newToast = { id: Date.now(), message, type };
  setToasts((prevToasts) => [...prevToasts, newToast]);

  setTimeout(() => {
    setToasts((prevToasts) => prevToasts.filter((t) => t.id !== newToast.id));
  }, 3000);
};  const [toasts, setToasts] = useState([]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto  mt-30">
        <h1 className="text-xl font-bold my-4">Applicants 
          ({applicants?.applications?.length})
          </h1>
          <hr/>
        <ApplicantsTable />
      </div>
            {/* Toast Notifications */}
            <div className="toast toast-bottom toast-end space-y-2">
        {toasts.map((toast) => (
          <div key={toast.id} className={`alert ${toast.type} toast-animation`}>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .toast-animation {
            animation: fadeIn 0.3s ease-out;
          }
        `}
      </style>
    </div>
  );
}

export default Applicants;
