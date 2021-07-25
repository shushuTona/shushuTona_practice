import React from 'react';
import { Link } from 'react-router-dom';
import './css/SideNav.css';

const SideNav = React.memo( () => {
    console.log( 'SideNav' );

    return (
        <div className="l-sideNav">
            <div className="sideNav__inner">
                <ul className="sideNav__list">
                    <li className="sideNav__listItem"><Link to="/">Home</Link></li>
                    <li className="sideNav__listItem"><Link to="/goals">Personal Goals</Link></li>
                    <li className="sideNav__listItem"><Link to="/task">Task</Link></li>
                </ul>
            </div>
        </div>
    );
} );

export { SideNav };

