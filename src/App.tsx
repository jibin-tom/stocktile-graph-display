
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthProvider";
import NavigationGuard from "@/components/NavigationGuard";
import Index from "./pages/Index";
import Welcome from "./pages/Welcome";
import HowItWorks from "./pages/HowItWorks";
import NotFound from "./pages/NotFound";
import CreateWatchlist from "./pages/CreateWatchlist";
import Watchlists from "./pages/Watchlists";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <NavigationGuard />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/create-watchlist" element={<CreateWatchlist />} />
            <Route path="/watchlists" element={<Watchlists />} />
            {/* Add future routes here */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
