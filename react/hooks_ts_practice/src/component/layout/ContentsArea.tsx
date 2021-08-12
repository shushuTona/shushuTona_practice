import { lazy, memo, Suspense } from 'react';
import {
    Switch,
    Route
} from "react-router-dom";
import './css/ContentsArea.css';

// Page Component
import HomePage from '../pages/HomePage';
const TaskPage = lazy( () => import( '../pages/TaskPage' ));
const GoalsPage = lazy( () => import( '../pages/GoalsPage' ));

const ContentsArea = memo( () => {
    console.log( 'ContentsArea' );

    return (
        <div className="l-contentsArea">
            <div className="contentsArea__inner">
                <Suspense fallback={<p></p>}>
                    <Switch>
                            <Route path="/goals" component={GoalsPage} />
                            <Route path="/task" component={TaskPage} />
                            <Route path="/" component={HomePage} />
                    </Switch>
                </Suspense>
            </div>
        </div>
    );
} );

export { ContentsArea };
