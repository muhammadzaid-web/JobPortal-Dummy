import { MoreHorizontal, Pen } from "lucide-react";
import { useSelector } from "react-redux";
import useGetAllCompanies from "../../hooks/useGetAllCompanies";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function CompaniesTable() {
  useGetAllCompanies();
const {companies, searchCompanyByText } = useSelector(store => store.company);
const [filterCompany, setFilterCompany] = useState(companies);
const navigate = useNavigate();
useEffect(()=>{
    const filteredCompany = companies.length >= 0 && companies.filter((company)=>{
        if(!searchCompanyByText){
            return true
        };
        return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

    });
    setFilterCompany(filteredCompany);
},[companies,searchCompanyByText])

  return (
    <div className="py-10">
      <hr />
      <h1 className="heading text-2xl font-bold text-center mb-8">
        A list of your registered allCompanies
      </h1>
      <div
        className="overflow-x-auto  max-w-6xl mx-auto rounded-2xl border border-gray-400 shadow-lg p-4 mt-8"
        data-aos="flip-up"
        data-aos-delay="1000"
      >
        <table className="table-auto w-full text-sm md:text-base">
          <thead>
            <tr className="bg-gray-800 text-md lg:text-xl text-cyan-700">
              <th className="py-3 px-2 sm:px-4 text-left">Logo</th>
              <th className="py-3 px-2 sm:px-4 text-left">Name</th>
              <th className="py-3 px-2 sm:px-4 text-left">Date</th>
              <th className="py-3 px-2 sm:px-4 hidden md:table-cell text-center">Description</th>
              <th className="py-3 px-2 sm:px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {companies.length<=0 ? <span>Companies not found</span> :
            filterCompany?.map(company =>(
                <tr key={company._id} className="hover:bg-gray-700/30 transition-all">
                <td className="py-3 px-2 sm:px-4 text-left">
                  <div className="avatar">
                    <div className="w-10 sm:w-12 rounded-full ring-primary ring-offset-base-100 ring ring-offset-2">
                      <img src={`http://localhost:8000/uploads/${company.logo}`} alt={company.name} className="w-10"/>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-2 sm:px-4 text-left">{company.name}</td>
                <td className="py-3 px-2 sm:px-4 text-left">{new Date(company.createdAt).toLocaleDateString()}</td>
                <td className="py-3 px-2 sm:px-4 hidden md:table-cell text-center">{company?.description?.substring(0, 60)} . . .</td>
                <td className="py-3 px-2 lg:px-4 text-right">
                  <div className="dropdown dropdown-left">
                    <div tabIndex={0} role="button" className="cursor-pointer">
                      <MoreHorizontal />
                    </div>
                    <div
                      tabIndex={0}
                      className="dropdown-content menu bg-base-200 rounded-box z-[1] w-32 px-6 py-2 mt-3 shadow-md"
                    >
                      <div className="flex items-center justify-start gap-4 cursor-pointer " onClick={()=> navigate(`/admin/company/${company._id}`)}>
                        <Pen className="w-5"/>
                        <p className="text-md">Edit</p>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              ))}
        
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CompaniesTable;
