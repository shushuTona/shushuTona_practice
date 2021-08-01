import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from './component/layout/Header';
import { Main } from './component/layout/Main';
import { Footer } from './component/layout/Footer';
import { GoalItemContextProvider } from './component/GoalItemStateContext';

const App = () => {
  return (
    <Router>
      <GoalItemContextProvider>
        <div className="App">
            <Header />
            <Main />
            <Footer />
        </div>
      </GoalItemContextProvider>
    </Router>
  );
}

export default App;
