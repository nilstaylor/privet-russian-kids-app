import { Switch, Route, Router } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Letters from "@/pages/Letters";
import Words from "@/pages/Words";
import Listen from "@/pages/Listen";
import Match from "@/pages/Match";
import Repeat from "@/pages/Repeat";
import Review from "@/pages/Review";
import { Layout } from "@/components/Layout";
import { ProgressProvider } from "@/lib/progress";

function AppRouter() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/letters" component={Letters} />
        <Route path="/words" component={Words} />
        <Route path="/listen" component={Listen} />
        <Route path="/match" component={Match} />
        <Route path="/repeat" component={Repeat} />
        <Route path="/review" component={Review} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ProgressProvider>
          <Toaster />
          <Router hook={useHashLocation}>
            <AppRouter />
          </Router>
        </ProgressProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
