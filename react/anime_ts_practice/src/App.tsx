import { memo } from 'react';
import cssClassList from '@/styles/App.module.scss'

const App = memo( (): JSX.Element => {
    return (
        <div className={cssClassList.appRoot}>
            <p className={cssClassList.text}>anime_ts_practice</p>
        </div>
    );
} );

export default App;
