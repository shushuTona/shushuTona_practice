import {
    memo,
    MouseEventHandler,
    useCallback,
    useContext,
} from 'react';

import { useHistory } from "react-router-dom";

// Context
import { ModalStateContext } from '@/component/context/ModalContext';

// Module
import { Button } from '@/component/module/Button';

const AnnounceAddGoalModalContents = memo( () => {
    console.log( 'AnnounceAddGoalModalContents' );

    const history = useHistory();

    const modalContext = useContext( ModalStateContext );

    // 目標ページ変異ページクリック処理
    const clickChangeFinishBtnHandler: MouseEventHandler = useCallback( () => {
        modalContext.dispatch( {
            type: 'CLOSE_MODAL'
        } );

        history.push( "/goals" );
    }, [modalContext, history] );

    return (
        <div className="modal__announceAddGoal">
            <p>目標がまだ設定されていません！<br />まずは目標ページから達成したい目標を設定しよう！</p>

            <div className="modal__btnList">
                <Button btnText="目標を設定する" clickHandler={clickChangeFinishBtnHandler} />
            </div>
        </div>
    )
} );

export default AnnounceAddGoalModalContents;
