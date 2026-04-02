import { createContext, useContext, useState } from "react";
import { transactions as initialTransactions } from "../data/mockData";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [role, setRole] = useState("admin");
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

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
      }}
    >
      <div className={darkMode ? "dark" : ""}>
        {children}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);