
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Lazy load pages for better performance
const Home = lazy(() => import("./pages/Index"));
const Predictor = lazy(() => import("./pages/Predictor"));
const Visualization = lazy(() => import("./pages/Visualization"));
const NotFound = lazy(() => import("./pages/NotFound"));
const MapPage = lazy(() => import("./pages/Map"));


// Loading fallback
const PageLoader = () => (
  <div className="min-h-[70vh] flex items-center justify-center">
    <div className="h-12 w-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/predictor" element={<Predictor />} />
                <Route path="/visualization" element={<Visualization />} />
                <Route path="/map" element={<MapPage />} />  {/* Add this line */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
