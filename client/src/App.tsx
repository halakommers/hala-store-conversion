import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ProductPage from "@/pages/ProductPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/p/:slug" component={ProductPage} />
      
      {/* Optional dummy pages that redirect or show simple content */}
      <Route path="/policies/:any" component={() => <div className="p-20 text-center">صفحة السياسات (قيد الإنشاء)</div>} />
      <Route path="/contact" component={() => <div className="p-20 text-center">صفحة اتصل بنا (قيد الإنشاء)</div>} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
