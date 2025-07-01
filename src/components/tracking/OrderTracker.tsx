
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle, Clock, Leaf, Package, Truck, MapPin, Camera, MessageCircle } from "lucide-react";

interface TrackingStage {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
  active: boolean;
  timestamp?: string;
  location?: string;
  photos?: string[];
  notes?: string;
}

export const OrderTracker = () => {
  const [progress, setProgress] = useState(60);
  const [stages, setStages] = useState<TrackingStage[]>([
    {
      id: "sowing",
      name: "Sowing Started",
      description: "Seeds planted in organic soil",
      icon: <Leaf className="h-5 w-5" />,
      completed: true,
      active: false,
      timestamp: "2024-06-01 09:00 AM",
      location: "Green Valley Farm, Plot A-12",
      notes: "Organic vegetable seeds planted with natural fertilizers"
    },
    {
      id: "growing",
      name: "Growing Phase",
      description: "Crops are growing with organic care",
      icon: <div className="text-green-600">🌱</div>,
      completed: true,
      active: false,
      timestamp: "2024-06-15 10:30 AM",
      location: "Green Valley Farm",
      notes: "Regular watering and organic pest control applied"
    },
    {
      id: "harvesting",
      name: "Ready for Harvest",
      description: "Crops have matured and ready for picking",
      icon: <div className="text-orange-600">🌾</div>,
      completed: false,
      active: true,
      timestamp: "Expected: 2024-07-10",
      location: "Green Valley Farm"
    },
    {
      id: "packaging",
      name: "Packaging",
      description: "Fresh produce being carefully packaged",
      icon: <Package className="h-5 w-5" />,
      completed: false,
      active: false
    },
    {
      id: "shipping",
      name: "Out for Delivery",
      description: "Your order is on the way",
      icon: <Truck className="h-5 w-5" />,
      completed: false,
      active: false
    },
    {
      id: "delivered",
      name: "Delivered",
      description: "Fresh organic produce delivered to your door",
      icon: <CheckCircle className="h-5 w-5" />,
      completed: false,
      active: false
    }
  ]);

  const orderDetails = {
    orderId: "FTO-2024-001",
    farmName: "Green Valley Organic Farm",
    farmerName: "Rajesh Kumar",
    expectedDelivery: "July 15, 2024",
    deliverySlot: "Morning (9 AM - 12 PM)",
    items: [
      "Mixed Leafy Greens (500g)",
      "Organic Tomatoes (1kg)", 
      "Fresh Carrots (750g)",
      "Organic Onions (500g)",
      "Seasonal Fruits Mix (1kg)"
    ]
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // This would be replaced with real WebSocket or polling
      console.log("Checking for updates...");
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="border-green-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-green-800">Order Tracking</CardTitle>
                <CardDescription>Order #{orderDetails.orderId}</CardDescription>
              </div>
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                In Progress
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Farm Details</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="text-gray-600">Farm:</span> {orderDetails.farmName}</p>
                  <p><span className="text-gray-600">Farmer:</span> {orderDetails.farmerName}</p>
                  <p><span className="text-gray-600">Location:</span> Karnataka, India</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Delivery Info</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="text-gray-600">Expected:</span> {orderDetails.expectedDelivery}</p>
                  <p><span className="text-gray-600">Time Slot:</span> {orderDetails.deliverySlot}</p>
                  <p><span className="text-gray-600">Address:</span> 123 Green Street, Eco Colony</p>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Overall Progress</span>
                <span className="text-green-600 font-semibold">{progress}%</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>
          </CardContent>
        </Card>

        {/* Tracking Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-green-600" />
              <span>Farm to Table Journey</span>
            </CardTitle>
            <CardDescription>Track your produce every step of the way</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {stages.map((stage, index) => (
                <div key={stage.id} className="flex items-start space-x-4">
                  {/* Timeline Icon */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    stage.completed
                      ? 'bg-green-500 text-white'
                      : stage.active
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {stage.completed ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : stage.active ? (
                      <Clock className="h-5 w-5" />
                    ) : (
                      <Circle className="h-5 w-5" />
                    )}
                  </div>

                  {/* Timeline Content */}
                  <div className="flex-1 min-w-0">
                    <div className={`p-4 rounded-lg ${
                      stage.completed
                        ? 'bg-green-50 border border-green-200'
                        : stage.active
                        ? 'bg-orange-50 border border-orange-200'
                        : 'bg-gray-50 border border-gray-200'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`font-semibold ${
                          stage.completed
                            ? 'text-green-800'
                            : stage.active
                            ? 'text-orange-800'
                            : 'text-gray-600'
                        }`}>
                          {stage.name}
                        </h3>
                        {stage.active && (
                          <div className="flex items-center space-x-1">
                            <div className="h-2 w-2 bg-orange-500 rounded-full animate-pulse"></div>
                            <span className="text-xs text-orange-600 font-medium">Active</span>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-3">{stage.description}</p>
                      
                      {stage.timestamp && (
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                          <span>📅 {stage.timestamp}</span>
                          {stage.location && <span>📍 {stage.location}</span>}
                        </div>
                      )}
                      
                      {stage.notes && (
                        <p className="text-sm text-gray-700 bg-white p-2 rounded border-l-4 border-green-500">
                          <strong>Update:</strong> {stage.notes}
                        </p>
                      )}

                      {/* Photos placeholder */}
                      {stage.completed && (
                        <div className="mt-3 flex items-center space-x-2">
                          <Camera className="h-4 w-4 text-gray-500" />
                          <span className="text-xs text-gray-500">2 photos available</span>
                          <Button size="sm" variant="outline" className="h-6 text-xs">
                            View Photos
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Connecting Line */}
                  {index < stages.length - 1 && (
                    <div className={`absolute left-5 mt-10 w-0.5 h-6 ${
                      stage.completed ? 'bg-green-500' : 'bg-gray-300'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Order Contents */}
        <Card>
          <CardHeader>
            <CardTitle>Order Contents</CardTitle>
            <CardDescription>What's in your organic basket</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {orderDetails.items.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <div className="text-2xl">🥬</div>
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button className="flex-1 bg-green-600 hover:bg-green-700">
            <MessageCircle className="h-4 w-4 mr-2" />
            Chat with Farmer
          </Button>
          <Button variant="outline" className="flex-1 border-green-600 text-green-600">
            Contact Support
          </Button>
          <Button variant="outline" className="flex-1">
            Share Tracking
          </Button>
        </div>
      </div>
    </div>
  );
};
