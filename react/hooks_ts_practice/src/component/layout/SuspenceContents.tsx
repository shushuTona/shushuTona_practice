import {
    VFC,
    memo
} from 'react';
import '@/component/layout/css/SuspenceContents.css';

const SuspenceContents: VFC = memo( () => {
    return (
        <div className="m-suspence">
            <div className="suspence__inner">Loading...</div>
        </div>
    )
} );

SuspenceContents.displayName = 'SuspenceContents Component';

export default SuspenceContents;
