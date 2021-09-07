import {
    VFC,
    memo,
    MouseEventHandler
} from 'react';
import ButtonCssClassList from '@/styles/components/Button.module.scss';

interface Props {
    text: string,
    clickHandler: MouseEventHandler
}

const Button: VFC<Props> = memo( ( { text, clickHandler } ) => {
    return (
        <button
            type="button"
            className={ButtonCssClassList.button}
            onClick={clickHandler}
        >{text}</button>
    )
} );

Button.displayName = 'Button Component';

export { Button };
