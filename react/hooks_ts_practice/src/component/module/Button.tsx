import {
    VFC,
    memo,
    MouseEventHandler
} from 'react';
import './css/Button.css';

interface Props {
    btnText: string,
    clickHandler: MouseEventHandler,
    disabled?: boolean
}

const Button: VFC<Props> = memo( ( { btnText, clickHandler, disabled } ) => {
    console.log( 'Button' );

    return (
        <button
            className="m-button"
            type="button"
            disabled={ disabled }
            onClick={clickHandler }
        >{btnText}</button>
    );
} );

Button.displayName = 'Button Component';

export { Button };
