import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react"; // Assuming you're using Lucide React icons

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Show the button when the user scrolls down 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // Scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-all animate-bounce"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
}

export default ScrollToTopButton;