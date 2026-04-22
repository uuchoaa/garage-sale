import { Toaster } from "sonner";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Channels from "./pages/Channels";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
import Sidebar from "./components/Sidebar";
import { SidebarLayout } from "@/components/catalyst/sidebar-layout";

function Router() {
  return (
    <SidebarLayout sidebar={<Sidebar />} navbar={<></>}>
      <Switch>
        <Route path={"/"} component={Dashboard} />
        <Route path={"/inventory"} component={Inventory} />
        <Route path={"/channels"} component={Channels} />
        <Route path={"/messages"} component={Messages} />
        <Route path={"/settings"} component={Settings} />
        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </SidebarLayout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <Toaster />
        <Router />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
