
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Leaf, Package, MessageCircle, Calendar, Star, Truck, CheckCircle } from "lucide-react";

export const SubscriberDashboard = () => {
  const [activeOrder] = useState({
    id: "ORD-001",
    status: "harvesting",
    progress: 60,
    farmName: "Green Valley Farms",
    expectedDelivery: "2024-07-15",
    items: ["Mixed Vegetables", "Leafy Greens", "Root Vegetables"]
  });

  const trackingStages = [
    { stage: "sowing", label: "Sowing Started", completed: true, icon: "🌱" },
    { stage: "growing", label: "Growing", completed: true, icon: "🌿" },
    { stage: "harvesting", label: "Harvesting", completed: false, active: true, icon: "🌾" },
    { stage: "packaging", label: "Packaging", completed: false, icon: "📦" },
    { stage: "dispatch", label: "Out for Delivery", completed: false, icon: "🚚" },
    { stage: "delivered", label: "Delivered", completed: false, icon: "✅" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back! Track your organic journey.</p>
            </div>
            <div className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-green-600" />
              <span className="font-semibold text-green-800">Family Plan (4 Members)</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="orders" className="flex items-center space-x-2">
              <Package className="h-4 w-4" />
              <span>My Orders</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <span>👤</span>
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Schedule</span>
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center space-x-2">
              <MessageCircle className="h-4 w-4" />
              <span>Chat</span>
            </TabsTrigger>
            <TabsTrigger value="feedback" className="flex items-center space-x-2">
              <Star className="h-4 w-4" />
              <span>Feedback</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-6">
            {/* Active Order Tracking */}
            <Card className="border-green-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-green-800">Current Order Tracking</CardTitle>
                    <CardDescription>Order #{activeOrder.id} from {activeOrder.farmName}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    In Progress
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Overall Progress</span>
                      <span className="text-green-600 font-semibold">{activeOrder.progress}%</span>
                    </div>
                    <Progress value={activeOrder.progress} className="h-2" />
                  </div>

                  {/* Tracking Stages */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {trackingStages.map((item, index) => (
                      <div
                        key={item.stage}
                        className={`p-4 rounded-lg border-2 ${
                          item.completed
                            ? 'border-green-500 bg-green-50'
                            : item.active
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{item.icon}</span>
                          <div>
                            <div className={`font-medium ${
                              item.completed ? 'text-green-800' : item.active ? 'text-orange-800' : 'text-gray-500'
                            }`}>
                              {item.label}
                            </div>
                            {item.completed && <CheckCircle className="h-4 w-4 text-green-600 mt-1" />}
                            {item.active && <div className="h-2 w-2 bg-orange-500 rounded-full mt-1 animate-pulse" />}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Details */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Order Contents:</h4>
                    <div className="flex flex-wrap gap-2">
                      {activeOrder.items.map((item, index) => (
                        <Badge key={index} variant="outline">{item}</Badge>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Expected Delivery: <span className="font-semibold">{activeOrder.expectedDelivery}</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Your order history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: "ORD-002", date: "2024-06-30", status: "Delivered", items: 8 },
                    { id: "ORD-003", date: "2024-06-15", status: "Delivered", items: 10 },
                    { id: "ORD-004", date: "2024-06-01", status: "Delivered", items: 12 }
                  ].map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Order #{order.id}</div>
                        <div className="text-sm text-gray-600">{order.date} • {order.items} items</div>
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-200">
                        {order.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Manage your account details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Name</label>
                      <p className="text-gray-900">John Doe</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone</label>
                      <p className="text-gray-900">+91 9876543210</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <p className="text-gray-900">john.doe@email.com</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Family Size</label>
                      <p className="text-gray-900">4 Members</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Delivery Address</label>
                    <p className="text-gray-900">123 Green Street, Eco Colony, City - 560001</p>
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700">
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Delivery Schedule</CardTitle>
                <CardDescription>Your upcoming deliveries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { date: "2024-07-15", status: "Scheduled", type: "Weekly Box" },
                    { date: "2024-07-22", status: "Scheduled", type: "Weekly Box" },
                    { date: "2024-07-29", status: "Scheduled", type: "Weekly Box" }
                  ].map((delivery, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Calendar className="h-5 w-5 text-green-600" />
                        <div>
                          <div className="font-medium">{delivery.date}</div>
                          <div className="text-sm text-gray-600">{delivery.type}</div>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-green-600">
                        {delivery.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chat">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>Chat with farmers and support</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No active conversations</p>
                  <Button className="mt-4 bg-green-600 hover:bg-green-700">
                    Start New Chat
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback">
            <Card>
              <CardHeader>
                <CardTitle>Rate Your Experience</CardTitle>
                <CardDescription>Help us improve our service</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No pending feedback</p>
                  <p className="text-sm text-gray-500 mt-2">Rate deliveries after they arrive</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
