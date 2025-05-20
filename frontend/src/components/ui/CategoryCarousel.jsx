// import { ArrowLeft, ArrowRight } from "lucide-react";
// import { useState } from "react";

// function CategoryCarousel() {
//   const categories = [
//     "Frontend Developer",
//     "Backend Developer",
//     "Full Stack Developer",
//     "Data Scientist",
//     "Machine Learning Engineer",
//     "DevOps Engineer",
//     "Mobile Developer",
//     "Game Developer",
//     "Graphic Designer",
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handlePrev = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === 0 ? categories.length - 1 : prevIndex - 1
//     );
//   };

//   const handleNext = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === categories.length - 1 ? 0 : prevIndex + 1
//     );
//   };


//   return (
//     <div className="my-4 flex gap-6 items-center justify-center">
//       <button
//         className=" bg-gray-100 p-2 rounded-full cursor-pointer text-gray-700 hover:text-gray-900 hover:bg-gray-300 transition-all"
        
//       >
//         <ArrowLeft />
//       </button>
//       <div className="carousel carousel-center my-20 flex gap-10 w-[40%] p-4 bg-neutral/10 rounded-box">
//         {categories.map((item, index) => (
//           <button
//             className={`carousel-item border font-semibold cursor-pointer ${
//               index % 2 === 0 ? "text-indigo-500" : "text-cyan-500"
//             } bg-neutral rounded-box px-6 py-2`}
//           >
//             {item}
//           </button>
//         ))}
//       </div>
//       <button
//         className=" bg-gray-100 p-2 rounded-full cursor-pointer text-gray-700 hover:text-gray-900 hover:bg-gray-300 transition-all"
        
//       >
//         <ArrowRight />
//       </button>
//     </div>
//   );
// }

// export default CategoryCarousel;








// import { ArrowLeft, ArrowRight } from "lucide-react";
// import { useEffect, useRef, useState } from "react";

// function CategoryCarousel() {
//   const categories = [
//     "Frontend Developer",
//     "Backend Developer",
//     "Full Stack Developer",
//     "Data Scientist",
//     "Machine Learning Engineer",
//     "DevOps Engineer",
//     "Mobile Developer",
//     "Game Developer",
//     "Graphic Designer",
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const carouselRef = useRef(null);

//   const handlePrev = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex((prevIndex) => prevIndex - 1);
//     }
//   };

//   const handleNext = () => {
//     if (currentIndex < categories.length - 1) {
//       setCurrentIndex((prevIndex) => prevIndex + 1);
//     }
//   };

//   const scrollToIndex = (index) => {
//     if (carouselRef.current) {
//       const carousel = carouselRef.current;
//       const item = carousel.children[index];
//       const itemWidth = item.offsetWidth; // Width of the item
//       const gap = 40; // Gap between items (40px as per `gap-10` in Tailwind CSS)
//       const containerWidth = carousel.offsetWidth; // Width of the carousel container

//       // Calculate the scroll position to center the item
//       const scrollPosition =
//         item.offsetLeft - (containerWidth / 2) + (itemWidth / 2);

//       carousel.scrollTo({
//         left: scrollPosition,
//         behavior: "smooth",
//       });
//     }
//   };

//   useEffect(() => {
//     scrollToIndex(currentIndex);
//   }, [currentIndex]);

//   return (
//     <div className="my-4 flex gap-6 items-center justify-center">
//       <button
//         className="bg-gray-100 p-2 rounded-full cursor-pointer text-gray-700 hover:text-gray-900 hover:bg-gray-300 transition-all"
//         onClick={handlePrev}
//         disabled={currentIndex === 0}
//       >
//         <ArrowLeft />
//       </button>
//       <div
//         ref={carouselRef}
//         className="carousel carousel-center my-20 flex gap-10 w-[40%] p-4 bg-neutral/10 rounded-box overflow-x-auto scroll-smooth"
//         style={{ scrollBehavior: "smooth" }}
//       >
//         {categories.map((item, index) => (
//           <button
//             key={index}
//             className={`carousel-item border font-semibold cursor-pointer ${
              
//                  index % 2 === 0
//                   ? "text-indigo-500"
//                   : "text-cyan-500"
//                 // : "text-gray-500"
//             } bg-neutral rounded-box px-6 py-2  transition-transform flex-shrink-0`}
//             onClick={() => setCurrentIndex(index)}
//           >
//             {item}
//           </button>
//         ))}
//       </div>
//       <button
//         className="bg-gray-100 p-2 rounded-full cursor-pointer text-gray-700 hover:text-gray-900 hover:bg-gray-300 transition-all"
//         onClick={handleNext}
//         disabled={currentIndex === categories.length - 1}
//       >
//         <ArrowRight />
//       </button>
//     </div>
//   );
// }

// export default CategoryCarousel;

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import ReactEasySwipe from 'react-easy-swipe';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../../redux/jobSlice";


function CategoryCarousel() {
  const categories = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Scientist",
    "Machine Learning Engineer",
    "DevOps Engineer",
    "Mobile Developer",
    "Game Developer",
    "Graphic Designer",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? categories.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === categories.length - 1 ? 0 : prevIndex + 1
    );
  };

  const scrollToIndex = (index) => {
    if (carouselRef.current) {
      const carousel = carouselRef.current;
      const item = carousel.children[index];
      const itemWidth = item.offsetWidth;
      const containerWidth = carousel.offsetWidth;
      const scrollPosition =
        item.offsetLeft - containerWidth / 2 + itemWidth / 2;

      carousel.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      })
    }
  };

  useEffect(() => {
    scrollToIndex(currentIndex);
  }, [currentIndex]);

  // Autoplay functionality
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 2000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);
  
  const searchHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  }
  return (
    <div data-aos='flip-right' data-aos-delay='700' className="flex items-center sm:justify-center gap-2 sm:gap-4 max-w-full px-2 sm:px-6">
      {/* Previous Button */}
      
      <button
        className=" bg-gray-100 text-center p-1 sm:p-2  rounded-full  cursor-pointer text-gray-700 hover:text-gray-900 hover:bg-gray-300 transition-all"
        onClick={handlePrev}
      >
        <ArrowLeft className=" w-4 h-4 sm:w-5 sm:h-5"/>
      </button>
      
      {/* Carousel */}
      <div
        ref={carouselRef}
        className="carousel carousel-center my-6 flex gap-6 sm:gap-10 w-[90%] sm:w-[70%] md:w-[60%] lg:w-[40%] max-w-3xl p-2 sm:p-4 bg-gray-500/5 rounded-box overflow-x-auto scroll-smooth"
        style={{ scrollBehavior: "smooth" }}
      >
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={()=> searchHandler(category)}
            className={`carousel-item btn-outline border font-semibold cursor-pointer bg-sky-50 ${
              index % 2 === 0 ? "text-indigo-600" : "text-cyan-600"
            } rounded-full text-xs sm:text-sm lg:text-lg px-3 sm:px-4 py-1 sm:py-2 flex-shrink-0 whitespace-nowrap`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Next Button */}
      
      <button
        className=" bg-gray-100 p-1 sm:p-2 rounded-full  cursor-pointer text-gray-700 hover:text-gray-900 hover:bg-gray-300 transition-all"
        onClick={handleNext}
      >
        
        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5"/>
      </button>
      
    </div>
  );
}

export default CategoryCarousel;
