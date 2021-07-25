import React from 'react';
import './css/Header.css';

const Header = React.memo( () => {
    console.log( 'Header' );

    return (
        <header className="l-header">
            <div className="header__inner">
                <a className="header__logo" href="/">LOGO</a>
                <div className="header__account">ログインした名前</div>
            </div>
        </header>
    );
} );

export { Header };
