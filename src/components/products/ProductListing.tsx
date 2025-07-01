
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Leaf, Users, Clock, CheckCircle, Star } from "lucide-react";

export const ProductListing = () => {
  const [selectedFamily, setSelectedFamily] = useState("4");
  
  const products = [
    {
      id: 1,
      name: "Mixed Vegetable Basket",
      description: "Fresh seasonal vegetables including leafy greens, root vegetables, and more",
      image: "🥬",
      category: "Vegetables",
      rating: 4.8,
      reviews: 124,
      prices: {
        "2": 1200,
        "3": 1800,
        "4": 2400,
        "5": 3000
      },
      items: {
        "2": "6-8 items",
        "3": "9-12 items", 
        "4": "12-15 items",
        "5": "15-20 items"
      }
    },
    {
      id: 2,
      name: "Fresh Fruit Basket",
      description: "Seasonal organic fruits picked at perfect ripeness",
      image: "🍎",
      category: "Fruits",
      rating: 4.9,
      reviews: 89,
      prices: {
        "2": 1000,
        "3": 1500,
        "4": 2000,
        "5": 2500
      },
      items: {
        "2": "4-6 items",
        "3": "6-8 items",
        "4": "8-10 items", 
        "5": "10-12 items"
      }
    },
    {
      id: 3,
      name: "Complete Organic Combo",
      description: "Perfect mix of vegetables, fruits, and herbs for complete nutrition",
      image: "🌿",
      category: "Combo",
      rating: 4.7,
      reviews: 156,
      prices: {
        "2": 1800,
        "3": 2700,
        "4": 3600,
        "5": 4500
      },
      items: {
        "2": "10-12 items",
        "3": "15-18 items",
        "4": "20-25 items",
        "5": "25-30 items"
      }
    },
    {
      id: 4,
      name: "Leafy Greens Special",
      description: "Nutrient-rich leafy vegetables including spinach, kale, and lettuce",
      image: "🥬",
      category: "Leafy",
      rating: 4.6,
      reviews: 67,
      prices: {
        "2": 800,
        "3": 1200,
        "4": 1600,
        "5": 2000
      },
      items: {
        "2": "4-5 varieties",
        "3": "6-7 varieties",
        "4": "8-9 varieties",
        "5": "10-12 varieties"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Fresh Organic Subscriptions</h1>
          <p className="text-gray-600">Choose the perfect organic produce plan for your family</p>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-green-600" />
              <label className="font-medium">Family Size:</label>
            </div>
            <Select value={selectedFamily} onValueChange={setSelectedFamily}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2 Members</SelectItem>
                <SelectItem value="3">3 Members</SelectItem>
                <SelectItem value="4">4 Members</SelectItem>
                <SelectItem value="5">5+ Members</SelectItem>
              </SelectContent>
            </Select>
            <div className="text-sm text-gray-600">
              Prices shown for {selectedFamily} member{selectedFamily !== "1" ? "s" : ""} family
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow border-green-100">
              <CardHeader className="pb-3">
                <div className="text-center mb-4">
                  <div className="text-6xl mb-2">{product.image}</div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {product.category}
                  </Badge>
                </div>
                <CardTitle className="text-lg text-center text-green-800">{product.name}</CardTitle>
                <CardDescription className="text-center text-sm">
                  {product.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Rating */}
                <div className="flex items-center justify-center space-x-1">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium ml-1">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                </div>

                {/* Pricing */}
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    ₹{product.prices[selectedFamily as keyof typeof product.prices]}
                  </div>
                  <div className="text-sm text-gray-600">per month</div>
                  <div className="text-sm text-green-600 font-medium">
                    {product.items[selectedFamily as keyof typeof product.items]}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>100% Organic Certified</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Weekly Delivery</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Farm to Table Tracking</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Cancel Anytime</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Subscribe Now
                </Button>
                
                <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mt-12 bg-green-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-center text-green-800 mb-6">
            Why Choose Our Organic Subscriptions?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <Leaf className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-green-800 mb-2">100% Organic</h3>
              <p className="text-sm text-gray-600">
                All produce is certified organic and grown without harmful pesticides
              </p>
            </div>
            <div className="text-center">
              <Clock className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-green-800 mb-2">Fresh Daily</h3>
              <p className="text-sm text-gray-600">
                Harvested fresh and delivered within 24 hours of picking
              </p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-green-800 mb-2">Family Focused</h3>
              <p className="text-sm text-gray-600">
                Customized portions based on your family size and preferences
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
