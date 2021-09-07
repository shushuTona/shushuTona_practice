import {
    VFC,
    memo
} from 'react';
import {
    Link,
    useRouteMatch
} from 'react-router-dom';
import './css/SideNav.css';

interface Props {
    to: string,
    label: string
}

const CurrentLink: VFC<Props> = memo( ( { to, label } ) => {
    const current = useRouteMatch( { path: to } );

    return (
        <li className={'sideNav__listItem ' + ( current?.isExact ? 'is-current' : '' )}>
            <Link to={to}><span>{label}</span></Link>
        </li>
    )
} );

const SideNav = memo( () => {
    console.log( 'SideNav' );

    return (
        <div className="l-sideNav">
            <ul className="sideNav__list">
                <CurrentLink to="/" label="Home" />
                <CurrentLink to="/goals" label="Personal Goals" />
                <CurrentLink to="/task" label="Task" />
            </ul>
        </div>
    );
} );

SideNav.displayName = 'SideNav Component';

export { SideNav };
