
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedImage from "@/components/ui/AnimatedImage";
import FeatureCard from "@/components/ui/FeatureCard";
import { Button } from "@/components/ui/button";
import { ChevronRight, Leaf, BarChart2, LineChart, Sprout, Droplets } from "lucide-react";

const landImage = "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1200&h=800&q=80";
const farmImage = "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&h=800&q=80";
const forestImage = "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=1200&h=800&q=80";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 md:pt-20 lg:pt-28 pb-24 md:pb-32">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
          <div className="h-full w-full bg-[radial-gradient(#3c9144_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
              <div className="inline-block text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full mb-6">
                Land Fertility Prediction
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Sustainable Agriculture through{" "}
                <span className="text-primary">Smart Prediction</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
                Utilizing machine learning to predict land fertility and empower farmers with data-driven insights for sustainable agricultural practices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="rounded-full">
                  <Link to="/predictor">
                    Try Prediction
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link to="/visualization">
                    Explore Data
                  </Link>
                </Button>
              </div>
            </div>
            <div className={`relative transition-all duration-1000 delay-300 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <AnimatedImage 
                  src={landImage} 
                  alt="Fertile agricultural land"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-xl overflow-hidden shadow-lg w-48 h-48 md:w-64 md:h-64 animate-float">
                <div className="absolute inset-0 bg-black/10 backdrop-blur-sm z-10 rounded-xl"></div>
                <img 
                  src={farmImage}
                  alt="Agricultural farm"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 rounded-xl overflow-hidden shadow-lg w-32 h-32 md:w-48 md:h-48 animate-float" style={{ animationDelay: "2s" }}>
                <div className="absolute inset-0 bg-black/10 backdrop-blur-sm z-10 rounded-xl"></div>
                <img 
                  src={forestImage}
                  alt="Lush forest"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            pretitle="Key Features"
            title="Comprehensive Soil Analysis and Prediction"
            description="Our system analyzes critical soil parameters to provide accurate fertility predictions and sustainable agriculture recommendations."
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Leaf className="h-6 w-6" />}
              title="Fertility Prediction"
              description="Predict land fertility class based on soil nutrient levels, rainfall data, and vegetation indices."
            />
            <FeatureCard
              icon={<BarChart2 className="h-6 w-6" />}
              title="Data Visualization"
              description="Interactive charts and graphs to visualize historical trends and patterns in soil fertility data."
            />
            <FeatureCard
              icon={<LineChart className="h-6 w-6" />}
              title="Temporal Analysis"
              description="Analyze changes in fertility parameters over time to understand long-term sustainability."
            />
            <FeatureCard
              icon={<Sprout className="h-6 w-6" />}
              title="Sustainable Practices"
              description="Recommendations for sustainable farming practices based on soil health indicators."
            />
            <FeatureCard
              icon={<Droplets className="h-6 w-6" />}
              title="Rainfall Impact"
              description="Understand how annual rainfall patterns affect soil fertility and nutrient availability."
            />
            <FeatureCard
              icon={<Leaf className="h-6 w-6" />}
              title="NDVI Analysis"
              description="Leverage Normalized Difference Vegetation Index data to assess vegetation health and soil quality."
            />
          </div>
        </div>
      </section>

      {/* About Project Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            pretitle="About the Project"
            title="Empowering Agriculture Through Technology"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg mb-6">
                The Land Fertility Prediction System is designed to help farmers, researchers, and policymakers assess soil fertility using machine learning and geospatial analysis. The system predicts land fertility based on key environmental parameters such as Annual Rainfall, NDVI (Normalized Difference Vegetation Index), and soil nutrients (N, P, K).
              </p>
              <p className="text-lg mb-6">
                Key features of this project include:
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-primary rounded-full p-1">
                    <ChevronRight className="h-3 w-3 text-white" />
                  </div>
                  <span>Machine Learning Predictions: The model (XGBoost) classifies land into different fertility levels.</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-primary rounded-full p-1">
                    <ChevronRight className="h-3 w-3 text-white" />
                  </div>
                  <span>Interactive Visualization: Users can explore fertility trends over time for different districts and states.</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-primary rounded-full p-1">
                    <ChevronRight className="h-3 w-3 text-white" />
                  </div>
                  <span>Data-Driven Insights: Helps in making informed agricultural decisions based on historical and predicted data.</span>
                </li>
              </ul>
              <p className="text-lg">
                The project aims to support sustainable agriculture by enabling better land management and crop planning.
              </p>
            </div>
            
            <div className="relative">
              <div className="glass rounded-2xl p-8 md:p-10">
                <h3 className="text-2xl font-semibold mb-4">About Land Fertility</h3>
                <p className="mb-4">
                  Soil fertility is a critical factor in agricultural productivity and directly affects crop yield. Fertility is influenced by several factors, including:
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 bg-primary rounded-full p-1">
                      <ChevronRight className="h-3 w-3 text-white" />
                    </div>
                    <span>Soil Nutrients: Essential elements like Nitrogen (N), Phosphorus (P), and Potassium (K) play a key role in plant growth.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 bg-primary rounded-full p-1">
                      <ChevronRight className="h-3 w-3 text-white" />
                    </div>
                    <span>Climate Conditions: Rainfall patterns and temperature variations impact soil moisture and nutrient availability.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 bg-primary rounded-full p-1">
                      <ChevronRight className="h-3 w-3 text-white" />
                    </div>
                    <span>Vegetation Health (NDVI): NDVI measures plant health and reflects soil quality and fertility.</span>
                  </li>
                </ul>
                <p>
                  By analyzing these parameters, our project provides data-driven insights to help optimize land use and increase agricultural sustainability.
                </p>
              </div>
              <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-2xl bg-primary/10"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            pretitle="Our Team"
            title="Meet the Experts Behind the Project"
            description="Our team comprises passionate engineers committed to solving real-world agricultural challenges using technology."
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass rounded-xl p-6 text-center hover-lift">
              <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-semibold text-primary">MR</span>
              </div>
              <h3 className="text-xl font-semibold mb-1">Mohika Rane</h3>
              <p className="text-sm text-muted-foreground mb-3">Team Leader: Member 1</p>
              <p className="text-sm">Third Year Computer Engineering Student at Fr. CRCE, Bandra</p>
            </div>
            
            <div className="glass rounded-xl p-6 text-center hover-lift">
              <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-semibold text-primary">VR</span>
              </div>
              <h3 className="text-xl font-semibold mb-1">Vinisha Rajpurkar</h3>
              <p className="text-sm text-muted-foreground mb-3">Member 2 </p>
              <p className="text-sm">Third Year Computer Engineering Student at Fr. CRCE, Bandra</p>
            </div>
            
            <div className="glass rounded-xl p-6 text-center hover-lift">
              <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-semibold text-primary">RB</span>
              </div>
              <h3 className="text-xl font-semibold mb-1">Rohan Benoy</h3>
              <p className="text-sm text-muted-foreground mb-3">Member 3</p>
              <p className="text-sm">Third Year Computer Engineering Student at Fr. CRCE, Bandra</p>
            </div>
            
            <div className="glass rounded-xl p-6 text-center hover-lift">
              <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-semibold text-primary">PD</span>
              </div>
              <h3 className="text-xl font-semibold mb-1">Precious Dmello</h3>
              <p className="text-sm text-muted-foreground mb-3">Member 4</p>
              <p className="text-sm">Third Year Computer Engineering Student at Fr. CRCE, Bandra</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sustainability Goals Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            pretitle="Sustainability"
            title="Supporting Global Sustainability Goals"
            description="This project aligns with the United Nations Sustainable Development Goals (SDGs), particularly in addressing key environmental and food security challenges."
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass rounded-xl p-8 hover-lift">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-semibold">Zero Hunger (SDG 2)</h3>
              </div>
              <p>
                Helps improve agricultural productivity and food security by providing accurate fertility assessments. By optimizing soil management, farmers can increase yield while using resources more efficiently.
              </p>
            </div>
            
            <div className="glass rounded-xl p-8 hover-lift">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-primary">13</span>
                </div>
                <h3 className="text-xl font-semibold">Climate Action (SDG 13)</h3>
              </div>
              <p>
                Supports climate resilience by analyzing how environmental changes impact soil fertility. This helps farmers adapt to changing climate conditions and implement sustainable farming practices.
              </p>
            </div>
            
            <div className="glass rounded-xl p-8 hover-lift">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-primary">12</span>
                </div>
                <h3 className="text-xl font-semibold">Responsible Consumption & Production (SDG 12)</h3>
              </div>
              <p>
                Promotes efficient land and resource management, reducing soil degradation. By understanding soil health, farmers can minimize waste and use resources more effectively.
              </p>
            </div>
            
            <div className="glass rounded-xl p-8 hover-lift">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-primary">15</span>
                </div>
                <h3 className="text-xl font-semibold">Sustainable Agriculture (SDG 15)</h3>
              </div>
              <p>
                Encourages eco-friendly farming practices by providing insights on soil health. This helps maintain biodiversity and promote sustainable land management techniques.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary/10">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 max-w-2xl mx-auto">
            Ready to optimize your agricultural productivity with data-driven insights?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start using our prediction tools to make informed decisions about soil management and sustainable farming practices.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="rounded-full">
              <Link to="/predictor">
                Try Fertility Prediction
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link to="/visualization">
                Explore Historical Data
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
