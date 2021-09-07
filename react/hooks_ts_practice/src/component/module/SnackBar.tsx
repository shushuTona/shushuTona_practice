import {
    VFC,
    memo,
    useContext
} from 'react';
// Context
import { SnackBarStateContext } from '@/component/context/SnackBarContext';
import './css/SnackBar.css';

const SnackBar: VFC = memo( () => {
    const snackBarContexte = useContext( SnackBarStateContext );
    const { isSnackBarShow, snackBarHeading, snackBarContents } = snackBarContexte.state;

    return (
        <div className={'m-snackBar' + ( isSnackBarShow ? ' is-show' : '' )}>
            <div className="snackBar__inner">
                <p className="snackBar__heading">{ snackBarHeading }</p>
                <p className="snackBar__contents">{ snackBarContents }</p>
            </div>
        </div>
    )
} );

SnackBar.displayName = 'SnackBar Component';

export { SnackBar };
