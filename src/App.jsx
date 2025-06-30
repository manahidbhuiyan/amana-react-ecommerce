// src/App.jsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LayoutWrapper from './components/layout/LayoutWrapper';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="pt-[170px] min-h-screen px-4 bg-sectionBackgroundLight">
        <LayoutWrapper>
          <AppRoutes />
        </LayoutWrapper>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;