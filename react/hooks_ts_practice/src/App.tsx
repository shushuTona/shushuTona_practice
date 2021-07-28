import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from './component/layout/Header';
import { Main } from './component/layout/Main';
import { Footer } from './component/layout/Footer';
import { CommonContextProvider } from './component/CommonStateContext';

const App = () => {
  return (
    <Router>
      <CommonContextProvider>
        <div className="App">
            <Header />
            <Main />
            <Footer />
        </div>
      </CommonContextProvider>
    </Router>
  );
}

export default App;
