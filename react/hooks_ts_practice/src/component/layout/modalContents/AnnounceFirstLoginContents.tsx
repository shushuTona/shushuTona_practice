import {
    memo,
    MouseEventHandler,
    useCallback,
    useContext,
} from 'react';

// Context
import { ModalStateContext } from '../../context/ModalContext';

// Module
import { Button } from '../../module/Button';
import { Heading } from '../../module/Heading';

const AnnounceFirstLoginContents = memo( () => {
    console.log('AnnounceFirstLoginContents');

    const modalContext = useContext( ModalStateContext );

    // 閉じるボタンクリック処理
    const clickCloseBtnHandler: MouseEventHandler = useCallback( () => {
        modalContext.dispatch( {
            type: 'CLOSE_MODAL'
        } );
    }, [modalContext] );

    return (
        <div className="modal__announceFirstLogin">
            <div className="modal__scrollContents">
                <div className="modal__scrollContentsInner">
                    <Heading text="ガシガシ目標達成！" htmlHeadingTag="h1" />

                    <Heading text="達成したい目標を設定しよう！" htmlHeadingTag="h2" />
                    <p>Personal Goalsページで<span className="modal__bold">達成したい目標のタイトル</span>と<span className="modal__bold">その目標を達成したい理由</span>を入力することで、目標を設定することができます！</p>

                    <Heading text="次にタスクを設定しよう！" htmlHeadingTag="h2" />
                    <p>目標を設定した後は、その目標を達成する為に必要なタスクの設定をしましょう！<br />Taskページで<span className="modal__bold">タスクのタイトル・そのタスクの理由・どの目標を達成したいのか</span>を設定することができます！</p>

                    <Heading text="あとはタスクを進めるだけ！" htmlHeadingTag="h2" />
                    <p>目標とタスクの設定が完了したら、あとはタスクをガシガシ進めて目標を達成するだけ！</p>
                </div>
            </div>

            <div className="modal__btnList">
                <Button btnText="閉じる" clickHandler={clickCloseBtnHandler} />
            </div>
        </div>
    )
} );

export default AnnounceFirstLoginContents;
