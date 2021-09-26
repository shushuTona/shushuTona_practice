import {
    VFC,
    memo,
    MouseEventHandler,
} from 'react';

interface Props {
    btnText: string,
    clickHandler: MouseEventHandler,
    disabled?: boolean
}

const Btn: VFC<Props> = memo( ( { btnText, clickHandler, disabled = false } ) => {
    console.log( 'Btn : ' + btnText );

    return (
        <button className="btn" type="button" onClick={clickHandler} disabled={disabled}>{ btnText }</button>
    )
} );

export { Btn };
