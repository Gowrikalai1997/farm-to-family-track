
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { SubscriberDashboard } from "./components/dashboard/SubscriberDashboard";
import { ProductListing } from "./components/products/ProductListing";
import { OrderTracker } from "./components/tracking/OrderTracker";
import { CMSDashboard } from "./components/cms/CMSDashboard";
import { DynamicPage } from "./components/cms/DynamicPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<SubscriberDashboard />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/track" element={<OrderTracker />} />
          <Route path="/cms" element={<CMSDashboard />} />
          <Route path="/page/:slug" element={<DynamicPage />} />
          <Route path="/preview/:slug" element={<DynamicPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
