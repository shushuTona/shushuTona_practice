import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from './component/layout/Header';
import { Main } from './component/layout/Main';
import { Footer } from './component/layout/Footer';

const App = () => {
  return (
    <Router>
      <div className="App">
          <Header />
          <Main />
          <Footer />
      </div>
    </Router>
  );
}

export default App;
