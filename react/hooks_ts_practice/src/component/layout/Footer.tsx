import {
    VFC,
    memo
} from 'react';
import './css/Footer.css';

const Footer: VFC = memo( () => {
    console.log( 'Footer' );

    return (
        <footer className="l-footer">
            <p><small>© 2021 ガシガシ目標達成</small></p>
        </footer>
    );
} );

Footer.displayName = 'Footer Component';

export { Footer };
