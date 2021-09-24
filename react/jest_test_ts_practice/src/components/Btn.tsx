import {
    VFC,
    memo,
    MouseEventHandler,
} from 'react';

interface Props {
    btnText: string,
    clickHandler: MouseEventHandler
}

const Btn: VFC<Props> = memo( ( { btnText, clickHandler } ) => {
    return (
        <button onClick={clickHandler}>{ btnText }</button>
    )
} );

export { Btn };
