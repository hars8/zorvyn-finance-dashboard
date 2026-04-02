# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Zorvyn Finance Dashboard

A clean and interactive Finance Dashboard built for the Zorvyn Fintech Frontend Developer assignment.

## Live Demo
[Add your Vercel link here after deployment]

## Features
- Dashboard with summary cards, bar chart and pie chart
- Transactions page with search, filter and sort
- Role based UI — Admin can add transactions, Viewer is read only
- Insights page with spending analysis and smart tips
- Dark mode toggle
- Fully responsive design

## Tech Stack
- React + Vite
- Tailwind CSS
- Recharts
- React Router DOM
- React Context API

## Getting Started

### Installation
npm install

### Run the app
npm run dev

### Open in browser
http://localhost:5173

## Project Structure
src/
├── components/   → Sidebar
├── context/      → AppContext (global state)
├── data/         → Mock transaction data
├── pages/        → Dashboard, Transactions, Insights
└── App.jsx       → Main app with routing
