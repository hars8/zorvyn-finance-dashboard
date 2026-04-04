# Zorvyn Finance Dashboard

A clean, interactive, and fully responsive Finance Dashboard built for the Zorvyn Fintech Frontend Developer assignment.

## Live Demo

🌐 [View Live App](https://zorvyn-finance-dashboard-sepia.vercel.app)

## GitHub Repository

📁 [View Source Code](https://github.com/hars8/zorvyn-finance-dashboard)

## Screenshots



## Tech Stack

- **React + Vite** — Fast and modern frontend setup
- **Tailwind CSS** — Clean and responsive styling
- **Recharts** — Interactive charts and visualizations
- **React Router DOM** — Page navigation and routing
- **React Context API** — Global state management


## Features

### Core Features
- **Dashboard Overview** — Summary cards showing Total Balance, Income and Expenses with time based bar chart and categorical pie chart
- **Transactions Page** — Full list of transactions with search, filter by type and sort by date or amount
- **Role Based UI** — Admin can add and edit transactions, Viewer can only view data. Switch roles using the dropdown in sidebar
- **Insights Page** — Highest spending category, monthly comparison, savings rate, transaction summary and smart tips

### Bonus Features
- **Dark Mode** — Toggle between light and dark theme
- **localStorage** — Data persists after page refresh
- **Mock API** — Simulates real API call with 500ms loading delay
- **CSV Export** — Download all transactions as a CSV file
- **Loading Spinner** — Shows while data is being fetched
- **Page Transitions** — Smooth fade in animation on page change
- **Mobile Responsive** — Hamburger menu and optimized layout for all screen sizes


## Getting Started

### Prerequisites
Make sure you have these installed:
- Node.js v18 or above
- npm v9 or above

### Installation

1. Clone the repository
bash
git clone https://github.com/hars8/zorvyn-finance-dashboard.git


2. Go into the project folder
bash
cd zorvyn-finance-dashboard


3. Install dependencies
bash
npm install

4. Start the development server

npm run dev


5. Open in browser

http://localhost:5173


## Project Structure

src/
├── components/
│   └── Sidebar.jsx          → Navigation sidebar with role switcher and dark mode
├── context/
│   └── AppContext.jsx        → Global state — transactions, role, dark mode, filters
├── data/
│   └── mockData.js           → Mock transaction data and monthly chart data
├── pages/
│   ├── Dashboard.jsx         → Overview with summary cards and charts
│   ├── Transactions.jsx      → Transaction list with search, filter, sort, add, edit
│   └── Insights.jsx          → Spending insights and smart tips
├── App.jsx                   → Main app with routing and loading spinner
├── main.jsx                  → React entry point
└── index.css                 → Tailwind CSS setup and animations


## How Role Based UI Works

The app simulates role based access control on the frontend:

| Feature | Admin | Viewer |
|---|---|---|
| View Dashboard | ✅ | ✅ |
| View Transactions | ✅ | ✅ |
| Add Transaction | ✅ | ❌ |
| Edit Transaction | ✅ | ❌ |
| Export CSV | ✅ | ✅ |
| View Insights | ✅ | ✅ |
| Dark Mode | ✅ | ✅ |

Switch roles using the dropdown in the sidebar — the UI updates instantly!


## State Management Approach

Used **React Context API** to manage:
- All transactions data
- Current role (admin or viewer)
- Dark mode preference
- Search and filter state
- Loading state for mock API

All state is also persisted to **localStorage** so data survives page refreshes.


## Assumptions Made

- All data is mock/static — no real backend
- Currency is Indian Rupee (₹)
- Mock API simulates a 500ms network delay on first load
- Role switching is for demonstration purposes only

