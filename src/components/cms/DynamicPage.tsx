import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router-dom";

interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: "draft" | "published";
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  };
}

// Mock data - in a real app, this would come from an API or database
const mockPages: Page[] = [
  {
    id: "1",
    title: "About Us",
    slug: "about",
    content: `
      <div class="space-y-6">
        <h1 class="text-4xl font-bold text-primary mb-6">About FarmTrace</h1>
        <div class="prose max-w-none">
          <p class="text-lg text-muted-foreground leading-relaxed">
            FarmTrace is revolutionizing the way families access fresh, organic produce by creating 
            a transparent connection between organic farmers and conscious consumers.
          </p>
          <h2 class="text-2xl font-semibold text-foreground mt-8 mb-4">Our Mission</h2>
          <p class="text-muted-foreground leading-relaxed">
            We believe that everyone deserves access to fresh, organic produce while supporting 
            local farmers and sustainable agriculture practices. Our platform enables complete 
            transparency from farm to table, allowing you to track your food's journey every step of the way.
          </p>
          <h2 class="text-2xl font-semibold text-foreground mt-8 mb-4">What Makes Us Different</h2>
          <ul class="space-y-3 text-muted-foreground">
            <li class="flex items-start gap-3">
              <span class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
              <span>Complete farm-to-table tracking with real-time updates</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
              <span>Direct communication with farmers and coordinators</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
              <span>Flexible subscription plans for families of all sizes</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
              <span>Support for organic farming communities</span>
            </li>
          </ul>
          <h2 class="text-2xl font-semibold text-foreground mt-8 mb-4">Join Our Community</h2>
          <p class="text-muted-foreground leading-relaxed">
            Start your journey towards healthier eating and sustainable living. Subscribe to our 
            organic produce boxes and become part of a community that values transparency, 
            quality, and environmental responsibility.
          </p>
        </div>
      </div>
    `,
    status: "published",
    seo: {
      metaTitle: "About FarmTrace - Organic Farm to Table Platform",
      metaDescription: "Learn about FarmTrace's mission to connect organic farmers with families through transparent supply chain tracking and fresh produce delivery.",
      keywords: "organic farming, farm to table, sustainable agriculture, fresh produce delivery"
    }
  },
  {
    id: "2",
    title: "How It Works",
    slug: "how-it-works",
    content: `
      <div class="space-y-8">
        <h1 class="text-4xl font-bold text-primary mb-6">How FarmTrace Works</h1>
        <p class="text-lg text-muted-foreground leading-relaxed">
          Getting fresh, organic produce delivered to your door is simple with FarmTrace. 
          Follow these easy steps to start your farm-to-table journey.
        </p>
        
        <div class="grid gap-8 mt-8">
          <div class="flex gap-6 items-start">
            <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">1</div>
            <div>
              <h3 class="text-xl font-semibold text-foreground mb-2">Choose Your Plan</h3>
              <p class="text-muted-foreground">Select a subscription plan based on your family size (2, 3, 4, or 5+ members) and preferred delivery frequency.</p>
            </div>
          </div>
          
          <div class="flex gap-6 items-start">
            <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">2</div>
            <div>
              <h3 class="text-xl font-semibold text-foreground mb-2">Track Your Produce</h3>
              <p class="text-muted-foreground">Watch your food grow! Get real-time updates from sowing to harvest, with photos and updates from your assigned farmer.</p>
            </div>
          </div>
          
          <div class="flex gap-6 items-start">
            <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">3</div>
            <div>
              <h3 class="text-xl font-semibold text-foreground mb-2">Stay Connected</h3>
              <p class="text-muted-foreground">Chat directly with farmers and coordinators. Ask questions, get updates, and learn about organic farming practices.</p>
            </div>
          </div>
          
          <div class="flex gap-6 items-start">
            <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">4</div>
            <div>
              <h3 class="text-xl font-semibold text-foreground mb-2">Receive Fresh Produce</h3>
              <p class="text-muted-foreground">Get your carefully packed, fresh organic produce delivered right to your doorstep with full delivery tracking.</p>
            </div>
          </div>
        </div>
        
        <div class="bg-muted p-6 rounded-lg mt-8">
          <h3 class="text-xl font-semibold text-foreground mb-4">Ready to Get Started?</h3>
          <p class="text-muted-foreground mb-4">Join thousands of families who trust FarmTrace for their organic produce needs.</p>
          <a href="/products" class="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            Browse Our Products
          </a>
        </div>
      </div>
    `,
    status: "published",
    seo: {
      metaTitle: "How FarmTrace Works - Simple Steps to Fresh Organic Produce",
      metaDescription: "Discover how easy it is to get fresh organic produce delivered to your door with FarmTrace's simple 4-step process and full farm-to-table tracking.",
      keywords: "organic delivery process, farm to table steps, subscription service, fresh produce delivery"
    }
  }
];

export function DynamicPage() {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch page by slug
    const fetchPage = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        const foundPage = mockPages.find(p => p.slug === slug && p.status === "published");
        setPage(foundPage || null);
      } catch (error) {
        console.error("Error fetching page:", error);
        setPage(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPage();
    }
  }, [slug]);

  useEffect(() => {
    // Update page title and meta tags
    if (page) {
      document.title = page.seo.metaTitle || page.title;
      
      // Update meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', page.seo.metaDescription);
      
      // Update meta keywords
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', page.seo.keywords);
    }
  }, [page]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading page...</p>
        </div>
      </div>
    );
  }

  if (!page) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FT</span>
              </div>
              <span className="font-bold text-foreground">FarmTrace</span>
            </Link>
            <nav className="flex items-center gap-6">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                <Home className="h-4 w-4" />
              </Link>
              <Link to="/products" className="text-muted-foreground hover:text-primary transition-colors">
                Products
              </Link>
              <Link to="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                Dashboard
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Button variant="outline" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
        
        <article className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: page.content }} />
        </article>
      </main>
    </div>
  );
}