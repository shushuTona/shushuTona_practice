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
import {
    memo,
    Fragment,
    createRef,
    ChangeEvent,
    MouseEventHandler,
    ChangeEventHandler,
    RefObject,
    useState,
    useEffect,
    useContext,
    useCallback,
    useMemo
} from 'react';
import { Link } from 'react-router-dom';

// Context
import { GoalItemStateContext } from '@/component/context/GoalItemStateContext';
import { ModalStateContext } from '@/component/context/ModalContext';
import { SnackBarStateContext } from '@/component/context/SnackBarContext';

// Module
import { Heading } from '@/component/module/Heading';
import { Button } from '@/component/module/Button';
import { Panel } from '@/component/module/Panel';
import { TextInput } from '@/component/module/TextInput';
import { Disclosure } from '@/component/module/Disclosure';

import './css/GoalsPage.css';

const panelStatusArray = ['Standby', 'Running', 'Finish', 'Stopped'];
type panelStatusType = typeof panelStatusArray[number];

interface GoalItemInterface {
    id: number,
    title: string,
    desc: string,
    panelStatus: panelStatusType,
    hasTaskNum: number,
    finishedTaskNum: number
}

const GoalsPage = memo( () => {
    console.log( 'GoalsPage' );

    const goalItemContext = useContext( GoalItemStateContext );
    const modalContext = useContext( ModalStateContext );
    const snackBarContexte = useContext( SnackBarStateContext );

    let count = Object.keys( goalItemContext.state ).length;
    const [title, setTitle] = useState( '' );
    const [desc, setDesc] = useState( '' );
    const [checkedItemList, setCheckedItemList] = useState<number[]>( [] );

    // 表示要素一覧配列を生成する
    const itemList = useMemo( (): GoalItemInterface[] => {
        const returnArray: GoalItemInterface[] = Object.values( goalItemContext.state );

        return returnArray;
    }, [goalItemContext.state] );

    // パネルに渡すrefオブジェクトの配列
    const panelRefObjArray = useMemo( () => {
        const returnArray: RefObject<HTMLInputElement>[] = [];

        itemList.forEach( () => {
            const panelRef = createRef<HTMLInputElement>();
            returnArray.push( panelRef );
        } );

        return returnArray;
    }, [itemList] );

    // ボタンの非活性コントロール用フラグを生成する
    const btnDisabledFlag = useMemo( () => {
        return title === '' || desc === '';
    }, [title, desc] );

    // ボタンがクリックされる度に、新しいアイテムをdispatchで追加する
    const btnClickAddItemHandler: MouseEventHandler = useCallback( () => {
        const payload = {
            id: count,
            title,
            desc,
            panelStatus: 'Standby',
            hasTaskNum: 0,
            finishedTaskNum: 0
        }

        goalItemContext.dispatch( {
            type: 'ADD_GOAL_ITEM',
            payload: [ payload ]
        } );

        count++;

        setTitle( '' );
        setDesc( '' );

        snackBarContexte.showSnackBar( {
            snackBarHeading: '目標設定が完了しました！',
            snackBarContents: 'Taskページで目標を達成する為に必要なタスクの設定をしましょう！'
        } );
    }, [goalItemContext, count, title, desc, snackBarContexte ] ); // TODO：Buttonコンポーネントの再レンダリングが走ってしまうけど、setCountが機能しなくなる

    // 選択した目標の内容を修正する
    const editBtnClickHandler: MouseEventHandler = useCallback( () => {
        const checkedItemIndex = checkedItemList[0];
        const { id, title, desc, panelStatus } = goalItemContext.state[checkedItemIndex];

        modalContext.dispatch( {
            type: 'EDIT_GOAL_ITEM',
            payload: {
                id,
                title,
                desc,
                panelStatus
            }
        } );

        setCheckedItemList( [] );
        panelRefObjArray.forEach( ( inputRefObj ) => {
            if ( inputRefObj.current ) {
                inputRefObj.current.checked = false;
            }
        } );
    }, [checkedItemList, goalItemContext.state, modalContext, panelRefObjArray] );

    // 選択した目標のステータスをStoppedに変更する
    const btnClickChangeStatusHandler: MouseEventHandler = useCallback( () => {
        const payloadArray: GoalItemInterface[] = [];
        checkedItemList.forEach( ( goalItemIndex ) => {
            payloadArray.push( goalItemContext.state[goalItemIndex] );
        } );

        goalItemContext.dispatch( {
            type: 'CHANGE_GOAL_ITEM_STATUS_STOPPED',
            payload: payloadArray
        } );

        setCheckedItemList( [] );
        panelRefObjArray.forEach( ( inputRefObj ) => {
            if ( inputRefObj.current ) {
                inputRefObj.current.checked = false;
            }
        } );

        snackBarContexte.showSnackBar( {
            snackBarHeading: '選択した目標のステータスを中断に変更しました！',
            snackBarContents: 'またやる気が出たらステータスを進行中に設定しよう！'
        } );
    }, [goalItemContext, checkedItemList, panelRefObjArray, snackBarContexte] );

    // パネルチェックボックスイベントハンドラ
    const panelChangeHandler = useCallback( ( panelID: number, checked: boolean ): void => {
        const indexNum = checkedItemList.indexOf( panelID );

        if ( checked ) {
            if ( indexNum < 0 ) {
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

    // タスクの数・完了数によって目標に紐付くタスク数を更新する
    useEffect( () => {
        goalItemContext.updateTaskNum();
    }, [] );

    return (
        <Fragment>
            <Heading htmlHeadingTag={'h1'} text={'Personal Goals'} />

            <p>目標のタイトルとその目標を達成したい理由を入力して新しい目標を追加しよう！</p>

            <div className="goalInputArea">
                <TextInput
                    inputType="input"
                    inputValue={title}
                    labelText="目標のタイトル"
                    placeholder="○○の資格を取る！"
                    changeInputHandler={titleInputChangeHandler} />

                <TextInput
                    inputType="textarea"
                    inputValue={desc}
                    labelText="目標を達成したい理由"
                    placeholder="○○の資格を取れると、△△が出来るようになるから。"
                    changeInputHandler={descInputChangeHandler} />
            </div>

            <ul className="btnArea">
                <li className="btnArea__item">
                    <Button
                        btnText="新しい目標を追加する"
                        clickHandler={btnClickAddItemHandler}
                        disabled={btnDisabledFlag} />
                </li>
                {
                    itemList.length !== 0 &&
                    <Fragment>
                        <li className="btnArea__item">
                            <Button
                                btnText="対象の目標を編集する"
                                clickHandler={editBtnClickHandler}
                                disabled={checkedItemList.length !== 1} />
                        </li>
                        <li className="btnArea__item">
                            <Button
                                btnText="対象の目標を中断する"
                                clickHandler={btnClickChangeStatusHandler}
                                disabled={checkedItemList.length === 0} />
                        </li>
                    </Fragment>
                }
            </ul>

            {
                itemList.length !== 0 &&
                (
                    <Disclosure title="目標のステータスについて">
                        <ul className="goalDescription__panelInner">
                            <li className="goalDescription__item">まだタスクが紐付けされていない目標は、ステータスが<span className="goalDescription__status">Standby</span>になります。<br /><Link to="/task">Taskページでタスクを設定しよう！</Link></li>
                            <li className="goalDescription__item">1つでも進行中のタスクが紐づいている目標は、ステータスが<span className="goalDescription__status">Running</span>になります。</li>
                            <li className="goalDescription__item">目標に紐づくタスクが全て完了になると、その目標は完了になり、ステータスが<span className="goalDescription__status">Finish</span>になります。</li>
                            <li className="goalDescription__item">途中で中断した目標は、ステータスが<span className="goalDescription__status">Stopped</span>になります。</li>
                        </ul>
                    </Disclosure>
                )
            }

            <ul className="panelArea">
                {
                    itemList.map( ( itemObj, index ) => {
                        return (
                            <li className="panelArea__item" key={ itemObj.id }>
                                <Panel
                                    panelID={itemObj.id}
                                    panelTitle={ itemObj.title }
                                    panelDesc={itemObj.desc}
                                    panelStatus={itemObj.panelStatus}
                                    panelHasTaskNum={itemObj.hasTaskNum}
                                    panelFinishedTaskNum={itemObj.finishedTaskNum}
                                    inputRef={panelRefObjArray[index]}
                                    changePanelHandler={panelChangeHandler} />
                            </li>
                        );
                    } )
                }
            </ul>
        </Fragment>
    );
} );

export default GoalsPage;
