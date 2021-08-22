import { memo } from 'react';

import './css/Footer.css';

const Footer = memo( () => {
    console.log( 'Footer' );

    return (
        <footer className="l-footer">
            <p><small>© 2021 ガシガシ目標達成</small></p>
        </footer>
    );
} );

export { Footer };
