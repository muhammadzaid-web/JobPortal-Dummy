import { ArrowLeft, Loader2 } from "lucide-react";
import Navbar from "../shared/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_END_POINT } from "../../utils/constant";
import { showToast } from "../../redux/toastSlice";

const PostJob = () => {
  const { companies } = useSelector((store) => store.company);
  const companyArray = [];
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    salary: 5,
    experience: 0,
    jobType: "",
    position: 0,
    companyId: "",
  });



  const changeEventHandler = (e) => {
    console.log("Input Changed");
    setInput({ ...input, [e.target.name]: e.target.value });
  };
// console.log(companies);

  const selectChangeHandler = (value) => {
    // console.log(value);
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    // console.log(selectedCompany);
    (selectedCompany)
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);

    try {
        setLoading(true);
        const res = await axios.post(`${JOB_API_END_POINT}/post`, input,{
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true
        });
        if(res.data.success){
          dispatchEvent(showToast({
            message: res.data.message,
            type: "success",
          }))
          setTimeout(()=>{
            navigate("/admin/jobs");
          },2500)
        }
      } catch (error) {
        console.log(error.response.data);
        dispatchEvent(showToast({
          message: "Something went wrong",
          type: "error",
        }))
    } finally{
      setTimeout(()=>{
        setLoading(false);
      },1500)
    }
  };

  return (
    <div>
      <Navbar />
      <div className="absolute top-20 md:top-30 left-1/12 lg:left-2/12">
        <button
          onClick={() => navigate("/admin/jobs")}
          className="scale-75 md:scale-100 btn btn-outline font-medium flex items-center gap-0 text-gray-500 hover:bg-gray-100 rounded-xl hover:text-black hover:rounded-4xl hover:shadow-white shadow-2xl transition-all duration-500 ease-in-out group"
        >
          <span className="scale-75 group-hover:-translate-x-2 transition-all duration-200 ease-in-out">
            <ArrowLeft />
          </span>
          <span>Back</span>
        </button>
      </div>
      <div data-aos="fade-up" className="p-4 md:p-0 max-w-xl mt-30 mx-auto">
        <form className="px-6 py-4 rounded-2xl border  shadow-primary shadow-2xl">
          <h1 className="text-center font-bold md:text-2xl text-xl">
            Post <span className="text-primary">Job</span>
          </h1>
          <div className="flex-col  sm:px-0 sm:grid  sm:grid-cols-2 gap-2 items-center">
            <div>
              <label
                className="cursor-pointer mt-3 flex items-center gap-2"
                htmlFor="title"
              >
                Job Title
              </label>
              <input
                data-aos="fade-left"
                data-aos-delay="700"
                type="text"
                className="input input-bordered w-full focus:outline-indigo-500 "
                placeholder="Job Title"
                name="title"
                id="title"
                value={input.title}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <label
                className="cursor-pointer mt-3 flex items-center gap-2"
                htmlFor="description"
              >
                Description
              </label>
              <input
                data-aos="fade-right"
                data-aos-delay="700"
                className="input input-bordered w-full focus:outline-indigo-500 "
                placeholder="Description"
                name="description"
                id="description"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <label
                className="cursor-pointer mt-3 flex items-center gap-2"
                htmlFor="requirements"
              >
                Requirements
              </label>
              <input
                data-aos="fade-left"
                data-aos-delay="700"
                type="text"
                className="input input-bordered w-full focus:outline-indigo-500 "
                placeholder="requirements"
                name="requirements"
                id="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <label
                className="cursor-pointer mt-3 flex items-center gap-2"
                htmlFor="location"
              >
                location
              </label>
              <input
                data-aos="fade-right"
                data-aos-delay="700"
                type="text"
                className="input input-bordered w-full focus:outline-indigo-500 "
                placeholder="location"
                name="location"
                id="location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <label
                className="cursor-pointer mt-3 flex items-center gap-2"
                htmlFor="salary"
              >
                Salary
              </label>
              <input
                data-aos="fade-left"
                data-aos-delay="700"
                type="number"
                className="input input-bordered w-full focus:outline-indigo-500 "
                placeholder="salary"
                name="salary"
                id="salary"
                value={input.salary}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <label
                className="cursor-pointer mt-3 flex items-center gap-2"
                htmlFor="experience"
              >
                Experience Level
              </label>
              <input
                data-aos="fade-right"
                data-aos-delay="700"
                type="text"
                className="input input-bordered w-full focus:outline-indigo-500 "
                placeholder="experience"
                name="experience"
                id="experience"
                value={input.experience}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <label
                className="cursor-pointer mt-3 flex items-center gap-2"
                htmlFor="position"
              >
                No of Position
              </label>
              <input
                data-aos="fade-left"
                data-aos-delay="700"
                type="text"
                className="input input-bordered w-full focus:outline-indigo-500 "
                placeholder="position"
                name="position"
                id="position"
                value={input.position}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <label
                className="cursor-pointer mt-3 flex items-center gap-2"
                htmlFor="jobType"
              >
                Job Type
              </label>
              <input
                data-aos="fade-right"
                data-aos-delay="700"
                type="text"
                className="input input-bordered w-full focus:outline-indigo-500 "
                placeholder="jobType"
                name="jobType"
                id="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              {companies.length > 0 && (
                <>
                  <label
                    className="cursor-pointer mt-3 flex items-center gap-2"
                    htmlFor="company"
                  >
                    Company
                  </label>
                  <select
                    data-aos="fade-left"
                    data-aos-delay="700"
                    id="company"
                    defaultValue="Pick a Company"
                    className="select focus:outline-indigo-500 "
                    onChange={(e) => selectChangeHandler(e.target.value)}
                  >
                    <option disabled={true}>Select a Company</option>
                    {companies.map((company) => {
                      return (
                        <option key={company._id} value={company.name?.toLowerCase()}
                    onClickCapture={selectChangeHandler}
                    >
                          {company.name}
                        </option>
                      );
                    })}
                  </select>
                </>
              )}
            </div>
          </div>
          <div className="px-10 sm:px-0 mt-5">
            {loading ? (
              <button
                className="btn btn-accent-content w-full text-lg text-white font-bold  mt-4"
                type="submit"
              >
                <span>
                  <Loader2 className="mx-2 h-5 w-5 animate-spin font-bold" />
                </span>
                Posting...
              </button>
            ) : (
              <button
                onClick={submitHandler}
                className="btn btn-primary w-full mt-4 text-lg"
                type="submit"
              >
                Post New Job
                
              </button>
            )}
            {companies.length === 0 && (
              <p className="text-sm font-bold text-red-500 text-center animate-pulse">
                *Please register a Company first, before posting a job
              </p>
            )}
          </div>
        </form>
      </div>

    </div>
  );
};

export default PostJob;
