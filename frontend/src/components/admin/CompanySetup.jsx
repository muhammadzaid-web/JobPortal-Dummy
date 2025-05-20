import { ArrowLeft, Globe, Loader2, MapPin } from "lucide-react";
import Navbar from "../shared/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetCompanyById from "../../hooks/useGetCompanyById";
import { showToast } from "../../redux/toastSlice";

function CompanySetup() {

  const navigate = useNavigate();
  const params = useParams();
  // console.log(params.id);
  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    location: "",
    website: "",
    file: null,
  });
  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("logo", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(showToast({
          message:res.data.message,
          type:"success"
        }))
        setTimeout(() => {
          navigate("/admin/companies");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      dispatch(showToast({
        message:error.response.data.message,
        type:"error"
      }))
      console.log(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || null,
    });
  }, [singleCompany]);

  return (
    <div>
      <Navbar />
      <div className="p-4 md:p-0 max-w-xl mt-30 mx-auto">
        <div className="flex items-center gap-5">
          <button className="btn btn-outline hover:shadow-2xl shadow-white hover:text-black font-medium flex items-center gap-0 text-gray-500 hover:bg-gray-100 rounded-md hover:rounded-4xl transition-all duration-400 ease-in-out group">
            <span className="scale-75 group-hover:-translate-x-2 transition-all duration-200 ease-in-out">
              <ArrowLeft />
            </span>
            <span>Back</span>
          </button>
          <h1 className="font-bold md:text-2xl text-md">
            Company <span className="text-primary">Setup</span>
          </h1>
        </div>
        <form
        data-aos='fade-down'
          className=" border px-4 py-4 mt-6 rounded-2xl shadow-2xl shadow-primary"
          onSubmit={submitHandler}
        >
          <div className="grid grid-cols-2 gap-3 items-center">
            <div>
              <label
                className="cursor-pointer mt-5 flex items-center gap-2"
                htmlFor="name"
              >
                Company Name
              </label>
              <input
              data-aos='fade-left'
                type="text"
                className="input input-bordered w-full"
                placeholder="Company Name"
                name="name"
                id="name"
                value={input.name}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <label
                className="cursor-pointer mt-5 flex items-center gap-2"
                htmlFor="description"
              >
                Description
              </label>
              <input
              data-aos='fade-right'
              type='text'
                className="input input-bordered w-full"
                placeholder="Description"
                name="description"
                id="description"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <label
                className="cursor-pointer mt-5 flex items-center gap-2"
                htmlFor="location"
              >
                <MapPin />
                location
              </label>
              <input
              data-aos='fade-left'
                type="text"
                className="input input-bordered w-full"
                placeholder="location"
                name="location"
                id="location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <label
                className="cursor-pointer mt-5 flex items-center gap-2"
                htmlFor="website"
              >
                <Globe />
                website
              </label>
              <input
              data-aos='fade-right'
                type="text"
                className="input input-bordered w-full"
                placeholder="website"
                name="website"
                id="website"
                value={input.website}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <label
                className="cursor-pointer mt-5 flex items-center gap-2"
                htmlFor="logo"
              >
                Logo
              </label>
              <input
              data-aos='fade-left'
                type="file"
                className="w-full sm:flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                placeholder="Choose Logo"
                accept="image/*"
                name="logo"
                id="logo"
                onChange={changeFileHandler}
              />
            </div>
          </div>

          {/* </div> */}
          {loading ? (
            <button className="btn btn-primary w-full mt-4 " type="submit">
              <span>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              </span>
              Updating...
            </button>
          ) : (
            <button className="btn btn-primary w-full mt-4" type="submit">
              Update
            </button>
          )}
        </form>
      </div>

    </div>
  );
}

export default CompanySetup;
