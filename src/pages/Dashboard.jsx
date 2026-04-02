import { useApp } from "../context/AppContext";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { monthlyData, spendingByCategory } from "../data/mockData";

const COLORS = ["#378ADD", "#9FE1CB", "#FAC775", "#F09595", "#AFA9EC", "#5DCAA5"];

const Dashboard = () => {
  const { totalBalance, totalIncome, totalExpense, transactions } = useApp();

  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="dark:text-white">

      {/* Page Title */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Dashboard Overview
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Welcome back! Here is your financial summary.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-400 mb-1">Total Balance</p>
          <p className="text-2xl font-semibold text-gray-800 dark:text-white">
            ₹{totalBalance.toLocaleString()}
          </p>
          <p className="text-xs text-blue-400 mt-1">Updated today</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-400 mb-1">Total Income</p>
          <p className="text-2xl font-semibold text-green-500">
            ₹{totalIncome.toLocaleString()}
          </p>
          <p className="text-xs text-green-400 mt-1">All time income</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-400 mb-1">Total Expenses</p>
          <p className="text-2xl font-semibold text-red-400">
            ₹{totalExpense.toLocaleString()}
          </p>
          <p className="text-xs text-red-300 mt-1">All time expenses</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

        {/* Bar Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-4">
            Monthly Income vs Expenses
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#378ADD" radius={[4, 4, 0, 0]} name="Income" />
              <Bar dataKey="expense" fill="#F09595" radius={[4, 4, 0, 0]} name="Expense" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-4">
            Spending by Category
          </h3>
          <ResponsiveContainer width="100%" height={260}>
  <PieChart>
    <Pie
      data={spendingByCategory}
      cx="50%"
      cy="45%"
      innerRadius={50}
      outerRadius={75}
      paddingAngle={3}
      dataKey="value"
    >
                {spendingByCategory.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-4">
          Recent Transactions
        </h3>
        <div className="space-y-3">
          {recentTransactions.map((txn) => (
            <div
              key={txn.id}
              className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-gray-700 last:border-0"
            >
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {txn.name}
                </p>
                <p className="text-xs text-gray-400">
                  {txn.category} • {txn.date}
                </p>
              </div>
              <span
                className={`text-sm font-semibold ${
                  txn.type === "income" ? "text-green-500" : "text-red-400"
                }`}
              >
                {txn.type === "income" ? "+" : "-"}₹
                {txn.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;