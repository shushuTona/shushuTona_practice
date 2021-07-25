import React from 'react';
import './css/Main.css';
import { SideNav } from './SideNav';
import { ContentsArea } from './ContentsArea';

const Main = React.memo( () => {
    console.log( 'Main' );

    return (
        <main className="l-main">
            <SideNav />
            <ContentsArea />
        </main>
    );
} );

export { Main };
