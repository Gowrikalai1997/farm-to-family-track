
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Truck, Users, Shield, ArrowRight, CheckCircle } from "lucide-react";
import { LoginModal } from "@/components/auth/LoginModal";
import { Link } from "react-router-dom";

const Index = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-green-800">FarmTrace</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-600 hover:text-green-600 transition-colors">Features</a>
            <Link to="/page/how-it-works" className="text-gray-600 hover:text-green-600 transition-colors">How It Works</Link>
            <Link to="/products" className="text-gray-600 hover:text-green-600 transition-colors">Products</Link>
            <Link to="/cms" className="text-gray-600 hover:text-green-600 transition-colors">CMS</Link>
            <Button onClick={() => setShowLogin(true)} className="bg-green-600 hover:bg-green-700">
              Get Started
            </Button>
          </nav>
          <Button onClick={() => setShowLogin(true)} className="md:hidden bg-green-600 hover:bg-green-700">
            Login
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4 bg-green-100 text-green-800 border-green-200">
            🌱 Farm to Table Transparency
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Track Your Organic Journey
            <span className="text-green-600 block">From Seed to Plate</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Subscribe to fresh organic produce with complete transparency. Track your food from sowing to delivery, 
            connect with local farmers, and enjoy healthy meals for your family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => setShowLogin(true)} className="bg-green-600 hover:bg-green-700 text-white">
              Start Your Subscription
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50" asChild>
              <Link to="/page/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose FarmTrace?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience complete transparency in your organic food journey with our comprehensive tracking platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center border-green-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Leaf className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-green-800">100% Organic</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Certified organic produce from verified farms with complete traceability
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-green-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Truck className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-green-800">Track Everything</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Real-time tracking from sowing to delivery with photo updates
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-green-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-green-800">Family Plans</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Flexible subscription plans for families of all sizes (2-5+ members)
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-green-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-green-800">Direct Connect</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Chat directly with farmers and get updates about your produce
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 px-4 bg-green-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Simple steps to get fresh organic produce delivered to your doorstep
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3 text-green-800">Subscribe</h3>
              <p className="text-gray-600">
                Choose your family size and subscription plan. Select from various organic produce packages.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3 text-green-800">Track</h3>
              <p className="text-gray-600">
                Follow your produce journey from sowing to harvest with real-time updates and photos.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3 text-green-800">Enjoy</h3>
              <p className="text-gray-600">
                Receive fresh organic produce at your doorstep and enjoy healthy meals with your family.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Family Subscription Plans
            </h2>
            <p className="text-lg text-gray-600">
              Choose the perfect plan for your family size
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { size: "2 Members", price: "₹1,200", items: "6-8 items" },
              { size: "3 Members", price: "₹1,800", items: "9-12 items" },
              { size: "4 Members", price: "₹2,400", items: "12-15 items" },
              { size: "5+ Members", price: "₹3,000", items: "15-20 items" }
            ].map((plan, index) => (
              <Card key={index} className="border-green-100 hover:border-green-300 transition-colors relative">
                {index === 2 && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-600">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-green-800">{plan.size}</CardTitle>
                  <CardDescription className="text-2xl font-bold text-gray-900">
                    {plan.price}<span className="text-sm font-normal">/month</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm">{plan.items} fresh organic items</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm">Weekly delivery</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm">Full tracking</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm">Chat with farmers</span>
                    </div>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => setShowLogin(true)}>
                    Select Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="h-6 w-6" />
                <span className="text-xl font-bold">FarmTrace</span>
              </div>
              <p className="text-green-100">
                Connecting families with fresh organic produce through transparent, traceable farming.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-green-100">
                <li><a href="#" className="hover:text-white transition-colors">For Subscribers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">For Farmers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">For Delivery Partners</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-green-100">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-green-100">
                <li><a href="#" className="hover:text-white transition-colors">WhatsApp</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Email</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Phone</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-100">
            <p>&copy; 2024 FarmTrace. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <LoginModal open={showLogin} onOpenChange={setShowLogin} />
    </div>
  );
};

export default Index;
