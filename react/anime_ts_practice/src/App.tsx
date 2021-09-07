import {
    VFC,
    memo,
    ElementType,
    RefObject,
    useRef
} from 'react';
import {
    BrowserRouter as Router,
    Route,
    NavLink
} from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import AppCssClassList from '@/styles/App.module.scss';
// page
import CSSTransitionComp from '@/pages/CSSTransitionComp';
import SwitchTransitionComp from '@/pages/SwitchTransitionComp';
import TransitionGroupComp from '@/pages/TransitionGroupComp';

interface RoutesItem {
    path: string,
    name: string,
    Component: ElementType,
    nodeRef: RefObject<HTMLDivElement>
}

const App: VFC = memo( () => {
    const routes: RoutesItem[] = [
        {
            path: '/CSSTransition',
            name: 'CSSTransition',
            Component: CSSTransitionComp,
            nodeRef: useRef<HTMLDivElement>( null )
        },
        {
            path: '/SwitchTransition',
            name: 'SwitchTransition',
            Component: SwitchTransitionComp,
            nodeRef: useRef<HTMLDivElement>( null )
        },
        {
            path: '/TransitionGroup',
            name: 'TransitionGroup',
            Component: TransitionGroupComp,
            nodeRef: useRef<HTMLDivElement>( null )
        },
    ];

    return (
        <main>
            <Router>
                <ul className={AppCssClassList.linkList}>
                    {
                        routes.map( ( route ) => {
                            return <li key={route.path} className={AppCssClassList.linkListItem}>
                                <NavLink
                                    to={route.path}
                                    activeClassName={AppCssClassList.activeLink}
                                >{route.name}</NavLink>
                            </li>
                        } )
                    }
                </ul>

                <div className={AppCssClassList.routeContents}>
                    {
                        routes.map( ( { path, Component, nodeRef } ) => {
                            return (
                                <Route
                                    key={path}
                                    path={path}
                                    exact
                                >
                                    {
                                        ( { match } ) => {
                                            return (
                                                <CSSTransition
                                                    in={match != null}
                                                    appear={true}
                                                    timeout={{
                                                        appear: 500,
                                                        enter: 300,
                                                        exit: 300
                                                    }}
                                                    nodeRef={nodeRef}
                                                    classNames={{
                                                        appear: AppCssClassList.pageAppear,
                                                        appearActive: AppCssClassList.pageAppearActive,
                                                        enter: AppCssClassList.pageEnter,
                                                        enterActive: AppCssClassList.pageEnterActive,
                                                        exit: AppCssClassList.pageExit,
                                                        exitActive: AppCssClassList.pageExitActive
                                                    }}
                                                    unmountOnExit
                                                >
                                                    <div ref={nodeRef} className={AppCssClassList.page}>
                                                        <Component />
                                                    </div>
                                                </CSSTransition>
                                            )
                                        }
                                    }
                                </Route>
                            )
                        } )
                    }
                </div>
            </Router>
        </main>
    );
} );

App.displayName = 'App Component';

export default App;
