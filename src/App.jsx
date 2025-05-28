import React from 'react';
import { BrowserRouter } from 'react-router-dom'; // ✅ import BrowserRouter
import AppRoutes from './routes/AppRoutes';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

const App = () => {
  return (
    <BrowserRouter> {/* ✅ Everything inside Router */}
      <Header />
      <main className="pt-[200px] min-h-screen px-4 bg-sectionBackgroundLight">
        <AppRoutes />
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
