# Zorvyn Finance Dashboard

A clean, interactive, and fully responsive Finance Dashboard built for the Zorvyn Fintech Frontend Developer assignment. Features role-based access, real-time charts, transaction management, and spending insights — all with a polished dark mode UI.

## Live Demo

https://zorvyn-finance-dashboard-sepia.vercel.app



## Features

- **Dashboard** — Summary cards, interactive bar chart and pie chart for financial overview
- **Transactions** — Full transaction list with search, filter by category, and sort by date/amount
- **Role-Based UI** — Admin users can add and edit transactions; Viewer role is read-only
- **Insights** — Spending analysis with category breakdowns and smart saving tips
- **Dark Mode** — Toggle between light and dark themes, persisted across sessions
- **Responsive Design** — Works seamlessly on desktop, tablet, and mobile

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React + Vite | Frontend framework and build tool |
| Tailwind CSS | Utility-first styling |
| Recharts | Bar and pie chart visualizations |
| React Router DOM | Client-side routing |
| React Context API | Global state management |

---

## Getting Started

### Prerequisites

Make sure you have **Node.js v18+** and **npm** installed.

### Installation

```bash
npm install


### Run the development server

```bash
npm run dev


### Open in browser

```
http://localhost:5173


### Build for production

```bash
npm run build



## Project Structure

src/
├── components/       → Reusable UI components (Sidebar, Cards, Charts)
├── context/          → AppContext — global state for transactions, theme, and role
├── data/             → Mock transaction data (JSON)
├── pages/
│   ├── Dashboard.jsx → Overview with summary cards and charts
│   ├── Transactions.jsx → Transaction list with search, filter, sort
│   └── Insights.jsx  → Spending analysis and smart tips
└── App.jsx           → Root component with routing and layout


## Role-Based Access

| Feature | Admin | Viewer |
|---|---|---|
| View Dashboard | Yes | Yes |
| View Transactions | Yes | Yes |
| Add Transaction | Yes | No |
| Edit Transaction | Yes | No |
| View Insights | Yes | Yes |

You can switch roles from the sidebar or settings panel to preview both experiences.

## React + Vite Setup

This project was bootstrapped with the official Vite React template.

Two official React plugins are available for Vite:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) — uses [Oxc](https://oxc.rs) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) — uses [SWC](https://swc.rs/) for Fast Refresh

This project uses `@vitejs/plugin-react`.

### React Compiler

The React Compiler is not enabled in this template due to its impact on dev and build performance. To enable it, follow the [official React Compiler installation guide](https://react.dev/learn/react-compiler/installation).

### ESLint Configuration

For production applications, it is recommended to use TypeScript with type-aware lint rules. See the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for integrating TypeScript and [`typescript-eslint`](https://typescript-eslint.io).

## License

This project was built as part of the Zorvyn Fintech Frontend Developer assignment.