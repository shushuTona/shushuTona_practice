import {
    memo,
    MouseEventHandler
} from 'react';

import './css/Button.css';

interface Props {
    btnText: string,
    clickHandler: MouseEventHandler,
    disabled?: boolean
}

const Button = memo( ( { btnText, clickHandler, disabled }: Props) => {
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

export { Button };
