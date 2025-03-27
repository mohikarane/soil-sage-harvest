
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Leaf } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Predictor", path: "/predictor" },
    { name: "Visualization", path: "/visualization" },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <NavLink 
            to="/" 
            className="flex items-center space-x-2 transition-opacity duration-200 hover:opacity-80"
          >
            <Leaf className="h-6 w-6 text-primary" />
            <span className="font-display text-xl font-semibold">
              Soil<span className="text-primary">Sage</span>
            </span>
          </NavLink>
          
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => 
                  `nav-link ${isActive ? "nav-link-active" : ""}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
          
          {/* Mobile menu button - can be expanded later */}
          <button className="flex md:hidden p-2 rounded-md hover:bg-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
