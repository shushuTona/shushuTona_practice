import {
    memo,
    MouseEventHandler
} from 'react';
import ButtonCssClassList from '@/styles/components/Button.module.scss';

interface Props {
    text: string,
    clickHandler: MouseEventHandler
}

const Button = memo( ( { text, clickHandler }: Props ) => {
    return (
        <button
            type="button"
            className={ButtonCssClassList.button}
            onClick={clickHandler}
        >{text}</button>
    )
} );

export { Button };
