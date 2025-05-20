import { useSelector } from "react-redux";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";
import ScrollToTopButton from "../components/shared/scrollToTop";
import CategoryCarousel from "../components/ui/CategoryCarousel";
import HeroSection from "../components/ui/HeroSection";
import LatestJobs from "../components/ui/LatestJobs";
import useGetAllJobs from "../hooks/useGetAllJobs";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home=()=> {
    useGetAllJobs();
    const {user} = useSelector(store=>store.auth);
    const navigate = useNavigate();
    useEffect(()=>{ 
        if(user?.role==="recruiter"){
            navigate('/admin/companies')
        }
        // eslint-disable-next-line
    },[])

    return ( 
        <div className=" w-full h-full">
            <Navbar  />
            <HeroSection/>
            <CategoryCarousel/> 
            <LatestJobs/>
            <Footer/> 
            <ScrollToTopButton/>
        </div>
     );
}

export default Home;