import React from 'react';
import { Link } from 'react-router-dom';
import './css/Header.css';

const Header = React.memo( () => {
    console.log( 'Header' );

    return (
        <header className="l-header">
            <div className="header__inner">
                <Link className="header__logo" to="/">LOGO</Link>
                <div className="header__account">ログインした名前</div>
            </div>
        </header>
    );
} );

export { Header };
