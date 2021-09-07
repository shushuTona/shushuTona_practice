import {
    VFC,
    memo,
    lazy,
    Suspense
} from 'react';
import {
    Switch,
    Route,
    RouteProps
} from "react-router-dom";
import './css/ContentsArea.css';

// Page Component
import HomePage from '@/component/pages/HomePage';
import SuspenceContents from '@/component/layout/SuspenceContents';

const TaskPage = lazy( () => import( '@/component/pages/TaskPage' ) );
const GoalsPage = lazy( () => import( '@/component/pages/GoalsPage' ) );

const GuardedRoute = memo( ( props: RouteProps ) => {
    return <Route {...props} />;
} );

const ContentsArea: VFC = memo( () => {
    console.log( 'ContentsArea' );

    return (
        <div className="l-contentsArea">
            <div className="contentsArea__inner">
                <Suspense fallback={<SuspenceContents />}>
                    <Switch>
                        <GuardedRoute path="/" exact component={HomePage} />
                        <GuardedRoute path="/goals" component={GoalsPage} />
                        <GuardedRoute path="/task" component={TaskPage} />
                    </Switch>
                </Suspense>
            </div>
        </div>
    );
} );

ContentsArea.displayName = 'ContentsArea Component';

export { ContentsArea };
