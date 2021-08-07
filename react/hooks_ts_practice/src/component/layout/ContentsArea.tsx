import React from 'react';
import {
    Switch,
    Route
} from "react-router-dom";
import './css/ContentsArea.css';

// Page Component
import HomePage from '../pages/HomePage';
const TaskPage = React.lazy( () => import( '../pages/TaskPage' ));
const GoalsPage = React.lazy( () => import( '../pages/GoalsPage' ));

const ContentsArea = React.memo( () => {
    console.log( 'ContentsArea' );

    return (
        <div className="l-contentsArea">
            <div className="contentsArea__inner">
                <React.Suspense fallback={<p></p>}>
                    <Switch>
                            <Route path="/goals" component={GoalsPage} />
                            <Route path="/task" component={TaskPage} />
                            <Route path="/" component={HomePage} />
                    </Switch>
                </React.Suspense>
            </div>
        </div>
    );
} );

export { ContentsArea };
