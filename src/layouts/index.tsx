import * as React from 'react';
import '../scss/main.scss';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const MainLayout: React.SFC = ({ children }) => (
  <div>
    <Header />
    <div className="container">
      <div>{children}</div>
    </div>
    <Footer />
  </div>
);

export default MainLayout;
