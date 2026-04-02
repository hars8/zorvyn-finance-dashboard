import { Link, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";

const Sidebar = () => {
  const { role, setRole, darkMode, setDarkMode } = useApp();
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard", icon: "📊" },
    { path: "/transactions", label: "Transactions", icon: "💳" },
    { path: "/insights", label: "Insights", icon: "💡" },
  ];

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col shadow-sm">
      
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-semibold">
          <span className="text-blue-500">Zorvyn</span>{" "}
          <span className="text-gray-800 dark:text-white">Finance</span>
        </h1>
        <p className="text-xs text-gray-400 mt-1">Financial Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">
          Menu
        </p>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 text-sm font-medium transition-all ${
              location.pathname === item.path
                ? "bg-blue-50 text-blue-600 border-l-4 border-blue-500 dark:bg-blue-900 dark:text-blue-300"
                : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            <span style={{ fontSize: "16px" }}>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Role Switcher */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-400 mb-2">Current Role</p>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 mb-3"
        >
          <option value="admin">Admin</option>
          <option value="viewer">Viewer</option>
        </select>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 flex items-center justify-center gap-2"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

    </div>
  );
};

export default Sidebar;