
import { useState, useEffect } from "react";

interface AnimatedImageProps {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
}

const AnimatedImage = ({ src, alt, className = "", delay = 0 }: AnimatedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInView(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-secondary animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-700 ${
          isInView && isLoaded 
            ? "opacity-100 scale-100" 
            : "opacity-0 scale-105"
        }`}
      />
    </div>
  );
};

export default AnimatedImage;
