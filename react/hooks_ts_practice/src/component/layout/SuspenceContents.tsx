import {
    memo
} from 'react';

import '@/component/layout/css/SuspenceContents.css';

const SuspenceContents = memo( () => {
    return (
        <div className="m-suspence">
            <div className="suspence__inner">Loading...</div>
        </div>
    )
} );

export default SuspenceContents;
