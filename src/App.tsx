import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { UploadPage } from './pages/UploadPage';
import { BrowseJobsPage } from './pages/BrowseJobsPage';
import { MarketOverviewPage } from './pages/MarketOverviewPage';
import { InterviewPrepPage } from './pages/InterviewPrepPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/jobs" element={<BrowseJobsPage />} />
          <Route path="/market" element={<MarketOverviewPage />} />
          <Route path="/interview" element={<InterviewPrepPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;