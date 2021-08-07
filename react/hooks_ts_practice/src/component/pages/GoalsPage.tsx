/**
 * GoalsPage
 *
 * 機能
 * ・各状態の目標（未対応・進行中・完了・中断）一覧を表示
 * ・新規の目標を追加
 * └目標名・目標を立てる目的・目標内容を設定する
 * └削除はできない（目標を止めた形跡は残すべき）
 * ・各目標に紐づいているタスク数表示
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
    panelStatus: 'Standby' | 'Running' | 'Finish' | 'Stopped',
    hasTaskNum: number,
    finishedTaskNum: number
}

const GoalsPage = memo( () => {
    console.log( 'GoalsPage' );

    const goalItemContext = useContext( GoalItemStateContext );
    let count = Object.keys( goalItemContext.state ).length;
    const [title, setTitle] = useState( '' );
    const [desc, setDesc] = useState( '' );
    const [checkedItemList, setCheckedItemList] = useState<number[]>([]);

    // ボタンがクリックされる度に、新しいアイテムをdispatchで追加する
    const btnClickHandler: MouseEventHandler = useCallback( () => {
        const payload = {
            id: count,
            title,
            desc,
            panelStatus: 'Standby',
            hasTaskNum: 0,
            finishedTaskNum: 0
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

    // パネルチェックボックスイベントハンドラ
    const panelChangeHandler = useCallback( ( panelID: number, checked: boolean ): void => {
        const indexNum = checkedItemList.indexOf(panelID);

        if (checked) {
            if (indexNum < 0) {
                setCheckedItemList( ( prevState ) => {
                    return [...prevState, panelID]
                } );
            }
        } else {
            if ( indexNum >= 0 ) {
                setCheckedItemList( ( prevState ) => {
                    // 対象のindexを除いた配列を生成
                    const newState = prevState.filter( ( item, index ) => {
                        return index !== indexNum;
                    } );

                    return newState;
                } );
            }
        }
    }, [checkedItemList] );

    // 目標のタイトル入力イベントハンドラ
    const titleInputChangeHandler: ChangeEventHandler = useCallback( ( event: ChangeEvent<HTMLInputElement> ) => {
        setTitle( event.target.value );
    }, [] );

    // 目標の理由入力イベントハンドラ
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
                    placeholder={'○○の資格を取る！'}
                    changeInputHandler={titleInputChangeHandler} />

                <TextInput
                    inputType={'textarea'}
                    inputValue={desc}
                    labelText={'何の為に目標を達成したいのか'}
                    placeholder={'○○の資格を取れると、△△が出来るようになるから。'}
                    changeInputHandler={descInputChangeHandler} />
            </div>

            <ul className="goalBtnArea">
                <li className="goalBtnArea__item">
                    <Button
                        btnText={'新しい目標を追加する'}
                        clickHandler={btnClickHandler}
                        disabled={btnDisabledFlag} />
                </li>
                {
                    checkedItemList.length === 1 &&
                    <li className="goalBtnArea__item">
                        <Button
                            btnText={'対象の目標を編集する'}
                            clickHandler={btnClickHandler} />
                    </li>
                }
                {
                    checkedItemList.length > 0 &&
                    <li className="goalBtnArea__item">
                        <Button
                            btnText={'対象の目標進捗を完了にする'}
                            clickHandler={btnClickHandler} />
                    </li>
                }
                {
                    checkedItemList.length > 0 &&
                    <li className="goalBtnArea__item">
                        <Button
                            btnText={'対象の目標進捗を中断にする'}
                            clickHandler={btnClickHandler} />
                    </li>
                }
            </ul>

            <ul className="goalPanelArea">
                {
                    itemList.map( ( itemObj ) => {
                        return (
                            <li className="goalPanelArea__item" key={ itemObj.id }>
                                <Panel
                                    panelID={itemObj.id}
                                    panelTitle={ itemObj.title }
                                    panelDesc={itemObj.desc}
                                    panelStatus={itemObj.panelStatus}
                                    panelHasTaskNum={itemObj.hasTaskNum}
                                    panelFinishedTaskNum={itemObj.finishedTaskNum}
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
