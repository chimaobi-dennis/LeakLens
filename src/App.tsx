import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/use-theme";
import { BrandProvider } from "@/hooks/use-brand";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Mentor from "./pages/Mentor";
import ModulePlaceholder from "./pages/ModulePlaceholder";
import ProStudio from "./pages/ProStudio";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <BrandProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/mentor" element={<Mentor />} />
                <Route path="/pro-studio" element={<ProStudio />} />
                <Route path="/campaign-kit" element={<ModulePlaceholder name="CampaignKit" />} />
                <Route path="/content-calendar" element={<ModulePlaceholder name="ContentCalendar" />} />
                <Route path="/doc-studio" element={<ModulePlaceholder name="DocStudio" />} />
                <Route path="/reel-builder" element={<ModulePlaceholder name="ReelBuilder" />} />
                <Route path="/brand-dna" element={<ModulePlaceholder name="Brand DNA" />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </BrandProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
