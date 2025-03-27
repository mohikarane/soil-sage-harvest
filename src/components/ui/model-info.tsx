
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getModelInfoAPI } from "@/api";
import { Cpu, Calendar, CheckCircle2 } from "lucide-react";

interface ModelInfoProps {
  className?: string;
}

export function ModelInfo({ className = "" }: ModelInfoProps) {
  const [modelInfo, setModelInfo] = useState<{
    name: string;
    version: string;
    accuracy: number;
    lastUpdated: string;
  } | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchModelInfo = async () => {
      try {
        const info = await getModelInfoAPI();
        setModelInfo(info);
      } catch (error) {
        console.error("Failed to fetch model info:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchModelInfo();
  }, []);
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Cpu className="mr-2 h-5 w-5 text-primary" />
          Model Information
        </CardTitle>
        <CardDescription>
          Details about the machine learning model used for predictions
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-4">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
          </div>
        ) : modelInfo ? (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">{modelInfo.name}</h3>
              <p className="text-sm text-muted-foreground">Version {modelInfo.version}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                <div>
                  <p className="text-sm font-medium">Accuracy</p>
                  <p className="text-xl font-bold">{(modelInfo.accuracy * 100).toFixed(1)}%</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Last Updated</p>
                  <p className="text-sm">{new Date(modelInfo.lastUpdated).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
              <p>This model was trained on historical data from 2003-2017 across multiple Indian states and districts.</p>
            </div>
          </div>
        ) : (
          <div className="py-4 text-center text-muted-foreground">
            <p>Unable to load model information</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default ModelInfo;
