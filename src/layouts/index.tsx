import * as React from 'react';
import '../scss/main.scss';
import Header from '../components/Header';

const MainLayout: React.SFC = ({ children }) => (
  <div>
    <Header />
    <div className="container">
      <div>{children}</div>
    </div>
    // TODO: Insert Footer
  </div>
);

export default MainLayout;
