import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";

const AppContent = () => {
  const { loading } = useApp();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400 text-sm">Loading your financial data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 md:ml-64 mt-14 md:mt-0 p-4 md:p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/insights" element={<Insights />} />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}

export default App;