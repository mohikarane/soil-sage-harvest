
import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary py-12 border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Leaf className="h-5 w-5 text-primary" />
              <span className="font-display text-lg font-semibold">
                Soil<span className="text-primary">Sage</span>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-md">
              Empowering sustainable agriculture through advanced soil fertility prediction and data-driven insights.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-muted-foreground mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-foreground/80 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/predictor" className="text-foreground/80 hover:text-primary transition-colors">
                  Predictor
                </Link>
              </li>
              <li>
                <Link to="/visualization" className="text-foreground/80 hover:text-primary transition-colors">
                  Visualization
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-muted-foreground mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-foreground/80 hover:text-primary transition-colors">
                  Soil Health Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/80 hover:text-primary transition-colors">
                  Sustainability Goals
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/80 hover:text-primary transition-colors">
                  Research Papers
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} SoilSage. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
              Privacy
            </a>
            <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
              Terms
            </a>
            <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
