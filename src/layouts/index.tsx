import * as React from 'react';
import '../scss/main.scss';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import HttpsRedirect from 'react-https-redirect';

const MainLayout: React.SFC = ({ children }) => (
  <HttpsRedirect>
    <Header />
    <div className="container">
      <div>{children}</div>
    </div>
    <Footer />
  </HttpsRedirect>
);

export default MainLayout;
