import { useState } from "react";
import { useApp } from "../context/AppContext";

const Transactions = () => {
  const { transactions, setTransactions, role, addTransaction, filter, setFilter, search, setSearch } = useApp();
  const [sortBy, setSortBy] = useState("date");
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [newTransaction, setNewTransaction] = useState({
    name: "",
    amount: "",
    type: "expense",
    category: "",
    date: "",
  });

  const handleAdd = () => {
    if (!newTransaction.name || !newTransaction.amount || !newTransaction.date || !newTransaction.category) {
      alert("Please fill all fields!");
      return;
    }
    addTransaction({
      ...newTransaction,
      amount: parseFloat(newTransaction.amount),
    });
    setNewTransaction({ name: "", amount: "", type: "expense", category: "", date: "" });
    setShowForm(false);
  };

  const handleEdit = (txn) => {
    setEditingTransaction({ ...txn });
  };

  const handleSaveEdit = () => {
    if (!editingTransaction.name || !editingTransaction.amount || !editingTransaction.date || !editingTransaction.category) {
      alert("Please fill all fields!");
      return;
    }
    setTransactions(
      transactions.map((t) =>
        t.id === editingTransaction.id
          ? { ...editingTransaction, amount: parseFloat(editingTransaction.amount) }
          : t
      )
    );
    setEditingTransaction(null);
  };

  const handleCancelEdit = () => {
    setEditingTransaction(null);
  };

  const exportCSV = () => {
    const headers = ["Name,Amount,Type,Category,Date"];
    const rows = transactions.map(
      (t) => `${t.name},${t.amount},${t.type},${t.category},${t.date}`
    );
    const csv = [...headers, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = transactions
    .filter((t) => {
      if (filter === "income") return t.type === "income";
      if (filter === "expense") return t.type === "expense";
      return true;
    })
    .filter((t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "date") return new Date(b.date) - new Date(a.date);
      if (sortBy === "amount") return b.amount - a.amount;
      return 0;
    });

  return (
    <div className="dark:text-white">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Transactions
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Manage and explore your transactions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={exportCSV}
            className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-lg transition-all"
          >
            📥 Export CSV
          </button>
          {role === "admin" && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg transition-all"
            >
              + Add Transaction
            </button>
          )}
        </div>
      </div>

      {/* Add Transaction Form — Admin Only */}
      {showForm && role === "admin" && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700 mb-6">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-4">
            New Transaction
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Name"
              value={newTransaction.name}
              onChange={(e) => setNewTransaction({ ...newTransaction, name: e.target.value })}
              className="text-sm px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            />
            <input
              type="number"
              placeholder="Amount"
              value={newTransaction.amount}
              onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
              className="text-sm px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            />
            <input
              type="text"
              placeholder="Category"
              value={newTransaction.category}
              onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
              className="text-sm px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            />
            <input
              type="date"
              value={newTransaction.date}
              onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
              className="text-sm px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            />
            <select
              value={newTransaction.type}
              onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
              className="text-sm px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            <button
              onClick={handleAdd}
              className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg transition-all"
            >
              Save Transaction
            </button>
          </div>
        </div>
      )}

      {/* Edit Transaction Form — Admin Only */}
      {editingTransaction && role === "admin" && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-blue-200 dark:border-blue-700 mb-6">
          <h3 className="text-sm font-medium text-blue-600 dark:text-blue-300 mb-4">
            ✏️ Edit Transaction
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Name"
              value={editingTransaction.name}
              onChange={(e) => setEditingTransaction({ ...editingTransaction, name: e.target.value })}
              className="text-sm px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            />
            <input
              type="number"
              placeholder="Amount"
              value={editingTransaction.amount}
              onChange={(e) => setEditingTransaction({ ...editingTransaction, amount: e.target.value })}
              className="text-sm px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            />
            <input
              type="text"
              placeholder="Category"
              value={editingTransaction.category}
              onChange={(e) => setEditingTransaction({ ...editingTransaction, category: e.target.value })}
              className="text-sm px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            />
            <input
              type="date"
              value={editingTransaction.date}
              onChange={(e) => setEditingTransaction({ ...editingTransaction, date: e.target.value })}
              className="text-sm px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            />
            <select
              value={editingTransaction.type}
              onChange={(e) => setEditingTransaction({ ...editingTransaction, type: e.target.value })}
              className="text-sm px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            <div className="flex gap-2">
              <button
                onClick={handleSaveEdit}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg transition-all"
              >
                Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm px-4 py-2 rounded-lg transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Filter Sort */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 mb-4 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-sm px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 flex-1 min-w-[200px]"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="text-sm px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
        >
          <option value="all">All Types</option>
          <option value="income">Income Only</option>
          <option value="expense">Expense Only</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="text-sm px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
        >
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
        </select>
      </div>

      {/* Transactions List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
        {filtered.length === 0 ? (
          <div className="p-10 text-center text-gray-400">
            No transactions found!
          </div>
        ) : (
          filtered.map((txn) => (
            <div
              key={txn.id}
              className="flex items-center justify-between px-5 py-4 border-b border-gray-50 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                  txn.type === "income" ? "bg-green-50" : "bg-red-50"
                }`}>
                  {txn.type === "income" ? "💰" : "💸"}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {txn.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {txn.category} • {txn.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  txn.type === "income"
                    ? "bg-green-50 text-green-600"
                    : "bg-red-50 text-red-400"
                }`}>
                  {txn.type}
                </span>
                <span className={`text-sm font-semibold ${
                  txn.type === "income" ? "text-green-500" : "text-red-400"
                }`}>
                  {txn.type === "income" ? "+" : "-"}₹{txn.amount.toLocaleString()}
                </span>
                {role === "admin" && (
                  <button
                    onClick={() => handleEdit(txn)}
                    className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-500 px-3 py-1 rounded-lg transition-all"
                  >
                    ✏️ Edit
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default Transactions;