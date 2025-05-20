import axios from "axios";
import React, { useEffect } from "react";
import { JOB_API_END_POINT } from "../utils/constant";
import { setAllJobs } from "../redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch(); // ✅ useDispatch must be at top-level of hook
const {searchedQuery} = useSelector((store) => store.job);
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const response = await axios.get(`${JOB_API_END_POINT}/get?keywords=${searchedQuery}`, {
          withCredentials: true,
        });
        if (response.data.success) {
          dispatch(setAllJobs(response.data.jobs));
          console.log(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllJobs();
  }, [dispatch]); // include dispatch as dependency
};

export default useGetAllJobs;
