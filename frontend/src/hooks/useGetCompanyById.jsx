import { useDispatch } from "react-redux";
import { COMPANY_API_END_POINT } from "../utils/constant";
import { setSingleCompany } from "../redux/companySlice";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function useGetCompanyById({companyId}) {
const params = useParams();
companyId = params.id;
const dispatch =useDispatch();
    return ( 
        useEffect(() => {
            const fetchSingleCompany = async (response,error) => {
              try {
                const response = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {
                  withCredentials: true,
                });
                if (response.data.success) {
                  console.log("response.data");
                  
                  dispatch(setSingleCompany(response?.data?.company));
                  console.log("setSingleCompany",response.data);
                }
              } catch (error) {
                console.error(error);
              }
            };
        
            fetchSingleCompany();
          }, [companyId,dispatch])
     );
}

export default useGetCompanyById;