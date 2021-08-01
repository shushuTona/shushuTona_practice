/**
 * GoalsPage
 *
 * 機能
 * ・各状態の目標（進行中・完了・中断）一覧を表示
 * ・新規の目標を追加
 * └目標名・目標を立てる目的・目標内容・目標達成日を設定する
 * └削除はできない（目標を止めた形跡は残すべき）
 * ・各目標に紐づいているタスク数表示
 * ・各目標に、目標詳細ページ（各項目・紐づいているタスク・合計時間）のリンク
 */
import { Fragment, memo, useContext, useCallback, ChangeEvent, MouseEventHandler, ChangeEventHandler, useState, useMemo } from 'react';
import { GoalItemStateContext } from '../GoalItemStateContext';
import { Heading } from '../module/Heading';
import { Button } from '../module/Button';
import { Panel } from '../module/Panel';
import { TextInput } from '../module/TextInput';
import './css/GoalsPage.css';

interface GoalItemInterface {
    id: number,
    title: string,
    desc: string,
    panelStatus: 'Standby' | 'Running' | 'Finish'
    taskNum: number
}

const GoalsPage = memo( () => {
    console.log( 'GoalsPage' );

    const goalItemContext = useContext( GoalItemStateContext );
    let count = Object.keys( goalItemContext.state ).length;
    const [ title, setTitle ] = useState( '' );
    const [desc, setDesc] = useState( '' );

    // ボタンがクリックされる度に、新しいアイテムをdispatchで追加する
    const btnClickHandler: MouseEventHandler = useCallback( () => {
        const payload = {
            id: count,
            title,
            desc,
            panelStatus: 'Standby',
            taskNum: 0
        }

        console.log( payload );

        goalItemContext.dispatch( {
            type: 'ADD_GOAL_STATE',
            payload
        });

        count++;

        setTitle( '' );
        setDesc( '' );
    }, [ goalItemContext, count, title, desc ] ); // TODO：Buttonコンポーネントの再レンダリングが走ってしまうけど、setCountが機能しなくなる

    const panelChangeHandler: ChangeEventHandler = useCallback( ( event: ChangeEvent<HTMLInputElement>) => {
        console.log( event );
    }, [] );

    const titleInputChangeHandler: ChangeEventHandler = useCallback( ( event: ChangeEvent<HTMLInputElement> ) => {
        setTitle( event.target.value );
    }, [] );

    const descInputChangeHandler: ChangeEventHandler = useCallback( ( event: ChangeEvent<HTMLTextAreaElement> ) => {
        setDesc( event.target.value );
    }, [] );

    // 表示要素一覧配列を生成する
    const itemList = useMemo( (): GoalItemInterface[] => {
        const returnArray: GoalItemInterface[] = Object.values( goalItemContext.state );

        return returnArray;
    }, [goalItemContext.state] );

    // ボタンの非活性コントロール用フラグを生成する
    const btnDisabledFlag = useMemo( () => {
        console.log('btnDisabledFlag');

        return title === '' || desc === '';
    }, [title, desc] );

    return (
        <Fragment>
            <Heading htmlHeadingTag={'h1'} text={'Personal goals'} />

            <div className="goalInputArea">
                <TextInput
                    inputType={'input'}
                    inputValue={title}
                    labelText={'目標のタイトル'}
                    changeInputHandler={titleInputChangeHandler} />

                <TextInput
                    inputType={'textarea'}
                    inputValue={desc}
                    labelText={'何の為に目標を達成したいのか'}
                    changeInputHandler={descInputChangeHandler} />
            </div>

            <Button
                btnText={'新しい目標を追加する'}
                clickHandler={btnClickHandler}
                disabled={btnDisabledFlag} />

            <ul className="goalPanelArea">
                {
                    itemList.map( ( itemObj ) => {
                        return (
                            <li className="goalPanelArea__item" key={ itemObj.id }>
                                <Panel
                                    panelID={`goalItem-${ itemObj.id }`}
                                    panelTitle={ itemObj.title }
                                    panelDesc={itemObj.desc}
                                    panelStatus={itemObj.panelStatus}
                                    changePanelHandler={panelChangeHandler} />
                            </li>
                        );
                    })
                }
            </ul>
        </Fragment>
    );
} );

export { GoalsPage };
