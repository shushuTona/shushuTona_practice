import { memo } from 'react';

import { Link } from 'react-router-dom';

import './css/Header.css';

const Header = memo( () => {
    console.log( 'Header' );

    return (
        <header className="l-header">
            <div className="header__inner">
                <Link className="header__logo" to="/">ガシガシ目標達成</Link>
            </div>
        </header>
    );
} );

export { Header };
