import { VFC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from '@/component/layout/Header';
import { Main } from '@/component/layout/Main';
import { Footer } from '@/component/layout/Footer';
import { SnackBar } from '@/component/module/SnackBar';
import { Modal } from '@/component/layout/Modal';

// Context
import { GoalItemContextProvider } from '@/component/context/GoalItemStateContext';
import { TaskItemContextProvider } from '@/component/context/TaskItemStateContext';
import { ModalStateContextProvider } from '@/component/context/ModalContext';
import { SnackBarContextProvider } from '@/component/context/SnackBarContext';

const App: VFC = () => {
    return (
        <Router>
            <GoalItemContextProvider>
                <TaskItemContextProvider>
                    <ModalStateContextProvider>
                        <SnackBarContextProvider>
                            <div className="App">
                                <Header />
                                <Main />
                                <Footer />
                                <SnackBar />
                                <Modal />
                            </div>
                        </SnackBarContextProvider>
                    </ModalStateContextProvider>
                </TaskItemContextProvider>
            </GoalItemContextProvider>
        </Router>
    );
}

export default App;
