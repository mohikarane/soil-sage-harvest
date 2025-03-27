
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="glass rounded-2xl p-8 md:p-12 max-w-lg w-full text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Leaf className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          The soil sample you're looking for couldn't be found
        </p>
        <Button asChild size="lg" className="rounded-full">
          <Link to="/">
            Return to Home
          </Link>
        </Button>
      </div>
      <div className="absolute -z-10 inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-background/40"></div>
        <div className="h-full w-full bg-[radial-gradient(#3c9144_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>
      </div>
    </div>
  );
};

export default NotFound;
