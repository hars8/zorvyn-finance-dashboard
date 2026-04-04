import { useApp } from "../context/AppContext";
import { monthlyData, spendingByCategory } from "../data/mockData";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Cell
} from "recharts";

const COLORS = ["#378ADD", "#9FE1CB", "#FAC775", "#F09595", "#AFA9EC", "#5DCAA5"];

const Insights = () => {
  const { transactions, totalIncome, totalExpense, totalBalance } = useApp();

  const highestCategory = spendingByCategory.reduce((a, b) =>
    a.value > b.value ? a : b
  );

  const lastMonth = monthlyData[monthlyData.length - 2];
  const thisMonth = monthlyData[monthlyData.length - 1];

  const expenseChange = (
    ((thisMonth.expense - lastMonth.expense) / lastMonth.expense) * 100
  ).toFixed(1);

  const savingsRate = (
    ((totalIncome - totalExpense) / totalIncome) * 100
  ).toFixed(1);

  const incomeTransactions = transactions.filter((t) => t.type === "income").length;
  const expenseTransactions = transactions.filter((t) => t.type === "expense").length;

  return (
    <div className="dark:text-white page-transition">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Insights
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Smart observations from your financial data
        </p>
      </div>

      {/* Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

        {/* Highest Spending */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <span style={{ fontSize: "16px" }}>🔥</span>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Highest Spending Category
            </p>
          </div>
          <p className="text-2xl font-semibold text-gray-800 dark:text-white">
            {highestCategory.name}
          </p>
          <p className="text-sm text-red-400 mt-1">
            ₹{highestCategory.value.toLocaleString()} spent
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Consider reducing spending in this category
          </p>
        </div>

        {/* Monthly Comparison */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <span style={{ fontSize: "16px" }}>📅</span>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Monthly Comparison
            </p>
          </div>
          <p className="text-2xl font-semibold text-gray-800 dark:text-white">
            {expenseChange > 0 ? "+" : ""}{expenseChange}%
          </p>
          <p className={`text-sm mt-1 ${expenseChange > 0 ? "text-red-400" : "text-green-500"}`}>
            {expenseChange > 0 ? "More" : "Less"} spending vs last month
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Last month: ₹{lastMonth.expense.toLocaleString()} →
            This month: ₹{thisMonth.expense.toLocaleString()}
          </p>
        </div>

        {/* Savings Rate */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <span style={{ fontSize: "16px" }}>💰</span>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Savings Rate
            </p>
          </div>
          <p className="text-2xl font-semibold text-green-500">
            {savingsRate}%
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Of your total income is saved
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Total saved: ₹{totalBalance.toLocaleString()}
          </p>
        </div>

        {/* Transaction Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <span style={{ fontSize: "16px" }}>📊</span>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Transaction Summary
            </p>
          </div>
          <p className="text-2xl font-semibold text-gray-800 dark:text-white">
            {transactions.length} Total
          </p>
          <p className="text-sm text-gray-400 mt-1">
            💚 {incomeTransactions} income •
            ❤️ {expenseTransactions} expenses
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Across all categories
          </p>
        </div>

      </div>

      {/* Spending by Category Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700 mb-4">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-4">
          Spending by Category
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={spendingByCategory} layout="vertical">
            <XAxis type="number" tick={{ fontSize: 12 }} />
            <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={90} />
            <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {spendingByCategory.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tips Section */}
      <div className="bg-blue-50 dark:bg-blue-900 rounded-xl p-5 border border-blue-100 dark:border-blue-700">
        <h3 className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-3">
          💡 Smart Tips Based on Your Data
        </h3>
        <ul className="space-y-2">
          <li className="text-sm text-blue-600 dark:text-blue-200">
            • Your highest spending is on {highestCategory.name} -
            try setting a monthly budget for it!
          </li>
          <li className="text-sm text-blue-600 dark:text-blue-200">
            • You are saving {savingsRate}% of your income -
            {savingsRate > 20 ? " great job! Keep it up! 🎉" : " try to save at least 20%!"}
          </li>
          <li className="text-sm text-blue-600 dark:text-blue-200">
            • You have {expenseTransactions} expense transactions -
            review them regularly to find unnecessary spending!
          </li>
        </ul>
      </div>

    </div>
  );
};

export default Insights;