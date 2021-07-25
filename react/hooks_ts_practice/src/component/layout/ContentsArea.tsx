import React from 'react';
import {
    Switch,
    Route
} from "react-router-dom";
import './css/ContentsArea.css';

// Page Component
import { HomePage } from '../pages/HomePage';
import { TaskPage } from '../pages/TaskPage';
import { GoalsPage } from '../pages/GoalsPage';

const ContentsArea = React.memo( () => {
    console.log( 'ContentsArea' );

    return (
        <div className="l-contentsArea">
            <div className="contentsArea__inner">
                <Switch>
                    <Route path="/goals">
                        <GoalsPage />
                    </Route>
                    <Route path="/task">
                        <TaskPage />
                    </Route>
                    <Route path="/">
                        <HomePage />
                    </Route>
                </Switch>
            </div>
        </div>
    );
} );

export { ContentsArea };
