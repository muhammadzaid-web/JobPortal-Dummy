// import { Search} from "lucide-react";

// function HeroSection() {
//   return (
//     <div className="pt-10 text-center hero-section">
//         <div className="flex flex-col gap-2">

//         <span className=" mx-auto text-cyan-600 bg-slate-300/15 rounded-full px-4 py-2 font-medium text-md">
//         No.1 <span >Job Hunt</span> Website
//       </span>
//       <h1 className="text-3xl md:text-5xl font-bold mt-4">Search, Apply & <br/>Get Your <span className="text-indigo-700">Dream Job</span></h1>
    
//         </div>
//         <div className="flex justify-center shadow-lg border border-base-content pl-3 rounded-full w-[40%] gap-4 mx-auto mt-4">
//             <input
//              type='text'
//              placeholder='Search for Jobs'
//              className='w-full outline-none border-none text-base-content'
//             />
//             <button className="btn btn-neutral bg-indigo-600 hover:bg-indigo-700 border-indigo-700  rounded-r-full">
//                 <Search className="w-5 h-5 font-bold"/>
//             </button>
//         </div>
//     </div>
//   );
// }

// export default HeroSection;



import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../../redux/jobSlice";

function HeroSection() {
  const [placeholder, setPlaceholder] = useState("");
  const placeholderText = "Search here for your DreamJobs...."; // 📝 Custom placeholder text
  let index = 0;

  useEffect(() => {
    function typeWriter() {
      if (index < placeholderText.length) {
        setPlaceholder(placeholderText.substring(0, index + 1));
        index++;
        setTimeout(typeWriter, 150);
      } else {
        setTimeout(() => {
          index = 0;
          typeWriter();
        }, 2000);
      }
    }
    typeWriter();
  }, []);

const [query,setQuery] = useState("");
const navigate= useNavigate();
const dispatch= useDispatch();

const searchHandler = () => {
  console.log(query);
  
  dispatch(setSearchedQuery(query));
  navigate("/browse");
}

  return (
    <div className="pt-30 text-center hero-section" >
      <div className="flex flex-col gap-2 ">
        <span data-aos='fade-down' className="mx-auto text-cyan-500 bg-slate-300/15 rounded-full px-4 py-2 font-medium text-md">
          No.1 Job Hunt Website
        </span>
        <h1 data-aos='zoom-in-up'  className="text-3xl md:text-5xl font-bold mt-4">
          Search, Apply & <br />
          Get Your <span className="text-indigo-700">Dream Job</span>
        </h1>
      </div>
      <div className="flex justify-center shadow-lg shadow-base-content/30 focus-within:shadow-xl border border-base-content pl-3 rounded-full w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] max-w-xl gap-2 sm:gap-4 mx-auto mt-4 transition-all">
      <input
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full outline-none border-none text-base-content px-2 py-2 text-sm sm:text-base bg-transparent"
      />
      <button onClick={searchHandler} className="btn btn-neutral bg-indigo-600 hover:bg-indigo-700 border-indigo-700 rounded-r-full px-4 py-2 min-h-0 h-auto">
        <Search className="w-4 h-4 sm:w-5 sm:h-5 font-bold" />
      </button>
    </div>
    </div>
  );
}

export default HeroSection;
