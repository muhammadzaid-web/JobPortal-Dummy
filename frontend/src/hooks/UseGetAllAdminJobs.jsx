import axios from "axios";
import React, { useEffect } from "react";
import { JOB_API_END_POINT } from "../utils/constant";
import { setAllAdminJobs } from "../redux/jobSlice";
import { useDispatch } from "react-redux";

const UseGetAllAdminJobs = () => {
  const dispatch = useDispatch(); // ✅ useDispatch must be at top-level of hook

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const response = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
          withCredentials: true,
        });
        if (response.data.success) {
          dispatch(setAllAdminJobs(response.data.jobs));
          console.log(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllAdminJobs();
  }, [dispatch]); // include dispatch as dependency
};

export default UseGetAllAdminJobs;
