import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RateColleagues from './pages/RateColleagues';
import TransactionLedger from './pages/TransactionLedger';
import Leaderboard from './pages/Leaderboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/rate"
          element={
            <Layout>
              <RateColleagues />
            </Layout>
          }
        />
        <Route
          path="/ledger"
          element={
            <Layout>
              <TransactionLedger />
            </Layout>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <Layout>
              <Leaderboard />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;