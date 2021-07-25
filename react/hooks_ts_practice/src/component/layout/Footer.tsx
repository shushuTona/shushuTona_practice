import React from 'react';
import './css/Footer.css';

const Footer = React.memo( () => {
    console.log( 'Footer' );

    return (
        <footer className="l-footer">
            <p><small>コピーライト</small></p>
        </footer>
    );
} );

export { Footer };
