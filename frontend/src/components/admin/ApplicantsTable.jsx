import axios from "axios";
import { Check, CheckCircle, MoreHorizontal, Plus, XCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { APPLICATION_API_END_POINT } from "../../utils/constant";
import { useState } from "react";

function ApplicantsTable() {
  const { applicants } = useSelector((store) => store.application);
  const [toasts, setToasts] = useState([]);
  const shortlistingStatus = ["Accepted", "Rejected"];

  const addToast = (message, type) => {
    const newToast = { id: Date.now(), message, type };
    setToasts((prevToasts) => [...prevToasts, newToast]);

    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((t) => t.id !== newToast.id));
    }, 3000);
  };

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );
      if(response === 200){
        addToast( 'Application status updated successfully', 'alert-success');
      }

    } catch (error) {
      console.log(error.response.message);
      addToast(error.response.data.message || 'Something went wrong', 'alert-error');
    }
  };

  return (
    <div>
      <table className="table-auto w-full text-sm md:text-base">
        <thead>
          <tr className="bg-gray-800 text-md lg:text-lg text-cyan-700">
            <th className="py-3 px-2 sm:px-4 text-left">Full Name</th>
            <th className="py-3 px-2 sm:px-4 text-center sm:text-left">
              Email
            </th>
            <th className="py-3 px-2 sm:px-4 text-left">Contact</th>
            <th className="py-3 px-2 sm:px-4 text-center">
              Resume
            </th>
            <th className="py-3 px-2 sm:px-4 text-center">
              Date
            </th>
            <th className="py-3 px-2 sm:px-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {applicants &&
            applicants.applications.map((item) => (
              <tr className="">
                <td className="py-3 px-2 sm:px-4 text-left">
                  {item.applicant.fullName}
                </td>
                <td className="py-3 px-2 sm:px-4 text-center sm:text-left">
                  {item.applicant.email}
                </td>
                <td className="py-3 px-2 sm:px-4 text-center sm:text-left">
                  {item.applicant.phoneNo}
                </td>
                <td className="py-3 px-2 sm:px-4 text-center sm:text-left">
                  {item?.applicant?.profile?.resume ? (
                    <a
                      href={`http://localhost:8000/${item?.applicant?.profile?.resume}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Resume
                    </a>
                  ) : (
                    <span className="text-red-500 text-center">
                      Not Applicable
                    </span>
                  )}
                </td>
                <td className="py-3 px-2 sm:px-4 text-center sm:text-left">
                  {new Date(item.applicant.createdAt).toLocaleDateString(
                    "en-GB",
                    { day: "2-digit", month: "short", year: "numeric" }
                  )}
                </td>

                <td className="py-3 px-2 lg:px-4 text-right">
                  <div className="dropdown dropdown-left">
                    <div tabIndex={0} role="button" className="cursor-pointer">
                      <MoreHorizontal />
                    </div>
                    <div
                      tabIndex={0}
                      className="dropdown-content menu bg-base-200 rounded-box z-[1] w-32 px-6 py-2 gap-2 text-center shadow-md"
                    > {
                      shortlistingStatus.map((status, index) => {
                          return (
                              <div onClick={() => statusHandler(status, item?._id)} key={index} className='flex w-fit items-center my-2 cursor-pointer'>
                                  <span className="flex gap-2">
                                    {status=== "Accepted" ? <CheckCircle className='mr-2' /> : <XCircle className='mr-2' />}
                                    {status}</span>
                              </div>
                          )
                      })
                  }</div>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

    </div>
  );
}

export default ApplicantsTable;
