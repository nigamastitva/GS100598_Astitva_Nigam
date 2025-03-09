import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { StoresPage } from './pages/StoresPage';
import { SKUsPage } from './pages/SKUsPage';
import { PlanningPage } from './pages/PlanningPage';
import { ChartPage } from './pages/ChartPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<StoresPage />} />
          <Route path="/skus" element={<SKUsPage />} />
          <Route path="/planning" element={<PlanningPage />} />
          <Route path="/chart" element={<ChartPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;