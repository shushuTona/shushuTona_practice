import {
    VFC,
    memo
} from 'react';
import { SideNav } from '@/component/layout/SideNav';
import { ContentsArea } from '@/component/layout/ContentsArea';
import './css/Main.css';

const Main: VFC = memo( () => {
    console.log( 'Main' );

    return (
        <main className="l-main">
            <SideNav />
            <ContentsArea />
        </main>
    );
} );

Main.displayName = 'Main Component';

export { Main };
