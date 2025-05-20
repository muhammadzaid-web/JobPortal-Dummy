// function FilterJobs() {
//     const filterData = [
//         {
//             filterType:"Location",
//             filterArray:["Delhi","Mumbai","Pune","Bangalore","Hyderabad","Chennai","Kolkata","Jaipur"]
//         },
//         {
//             filterType:"Industry",
//             filterArray:["Frontend Developer", "Backend Developer","Full Stack Developer"]
//         },
//         {
//             filterType:"Salary",
//             filterArray:["0-40K","42-1Lakh","1Lakh-5Lakh"]
//         },
//     ]
//     return ( 
//         <div className="p-2">
//             <h1 className="text-2xl font-bold">Filter <span className="text-indigo-600">Jobs</span></h1>
//             <hr className="mt-2"/>
//             {
//                 filterData.map((data,index)=>(
//                     (<div className="my-4 flex flex-wrap md:flex-col gap-2 md:gap-0">
//                         <h5 className="text-lg font-bold block" key={index}>{data.filterType}</h5>
//                         <br/>
//                         {
//                             data.filterArray.map((filter,index)=>(
//                                 <div className="flex items-center my-1">
//                                     <input type="radio" value={filter} id={index} className="mr-2" />
//                                     <label className="text-sm  cursor-pointer" htmlFor={filter}>{filter}</label>
//                                 </div>
//                             ))
//                         }
//                     </div>)
//                 ))
//             }
//         </div>
//      )
// }

// export default FilterJobs;


import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../../redux/jobSlice';// Optional if you're using Redux

const FilterJobs = () => {
  const filterData = [
    {
      filterType: "Location",
      filterArray: ["Delhi", "Mumbai", "Pune", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Jaipur"]
    },
    {
      filterType: "Industry",
      filterArray: ["Frontend Developer", "Backend Developer", "Full Stack Developer"]
    },
    {
      filterType: "Salary",
      filterArray: ["4", "12", "50"]
    }
  ];

  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedValue(value);
  };

  useEffect(() => {
    // if (selectedValue) {
      console.log("Selected Filter:", selectedValue);
      dispatch(setSearchedQuery(selectedValue)); // Optional if using Redux
    // }
  }, [selectedValue, dispatch]);
// fetchSingleJob()
  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold">Filter <span className="text-indigo-600">Jobs</span></h1>
      <hr className="mt-2" />
      {filterData.map((data, index) => (
        <div key={index} className="my-4 flex flex-wrap md:flex-col gap-2 md:gap-0">
          <h5 className="text-lg font-bold block">{data.filterType}</h5>
          <br />
          {data.filterArray.map((filter, idx) => {
            const id = `${data.filterType}-${idx}`;
            return (
              <div key={id} className="flex items-center my-1">
                <input
                  type="radio"
                  value={filter}
                  id={id}
                  name="jobFilter" // all filters share same group
                  className="mr-2 radio radio-primary"
                  onChange={handleChange}
                />
                <label className="text-sm cursor-pointer" htmlFor={id}>
                  {filter}
                </label>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default FilterJobs;
