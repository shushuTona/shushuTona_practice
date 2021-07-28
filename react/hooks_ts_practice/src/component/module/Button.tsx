import React, { MouseEventHandler, useCallback } from 'react';
import './css/Button.css';

interface GoalPayload {
    title: string,
    desc: string
}

interface Props {
    btnText: string,
    clickBtnHandler: ( payload: GoalPayload ) => void
}

const Button = React.memo( ( { btnText, clickBtnHandler }: Props) => {
    console.log( 'Button' );

    const clickHandler: MouseEventHandler = useCallback( () => {
        clickBtnHandler( {
            title: '目標タイトル',
            desc: '目標説明'
        } );
    }, [] );

    return (
        <button
            className="m-button"
            type="button"
            onClick={ clickHandler }
        >{btnText}</button>
    );
} );

export { Button };
