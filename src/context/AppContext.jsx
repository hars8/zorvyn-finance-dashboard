import { createContext, useContext, useState, useEffect } from "react";
import { transactions as initialTransactions } from "../data/mockData";

const AppContext = createContext();

const fetchTransactions = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(initialTransactions);
    }, 500);
  });
};

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  const [role, setRole] = useState(() => {
    return localStorage.getItem("role") || "admin";
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("transactions");
    if (!saved) {
      setLoading(true);
      fetchTransactions().then((data) => {
        setTransactions(data);
        setLoading(false);
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("role", role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const addTransaction = (transaction) => {
    setTransactions([
      { ...transaction, id: transactions.length + 1 },
      ...transactions,
    ]);
  };

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  return (
    <AppContext.Provider
      value={{
        transactions,
        setTransactions,
        role,
        setRole,
        darkMode,
        setDarkMode,
        filter,
        setFilter,
        search,
        setSearch,
        addTransaction,
        totalIncome,
        totalExpense,
        totalBalance,
        loading,
      }}
    >
      <div className={darkMode ? "dark" : ""}>
        {children}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);