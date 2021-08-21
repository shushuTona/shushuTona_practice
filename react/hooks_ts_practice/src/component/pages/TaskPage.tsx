/**
 * TaskPage
 *
 * 機能
 * ・チェックボックスがあるタスク一覧を表示
 * ・タスクの追加
 * └どのgoalを達成したい課題なのかを設定する。
 * ・タスクの削除
 * ・タスク名での検索機能
 * ・タスク詳細にはコメントのスレッド機能
 */
import {
    memo,
    Fragment,
    MouseEventHandler,
    ChangeEventHandler,
    ChangeEvent,
    createRef,
    RefObject,
    useState,
    useContext,
    useCallback,
    useMemo,
    useEffect
} from 'react';

import { GoalItemStateContext } from '../context/GoalItemStateContext';
import { TaskItemStateContext } from '../context/TaskItemStateContext';
import { ModalStateContext } from '../context/ModalContext';

import { Heading } from '../module/Heading';
import { Button } from '../module/Button';
import { Panel } from '../module/Panel';
import { TextInput } from '../module/TextInput';
import { Select } from '../module/Select';

import './css/TaskPage.css';

interface TaskItemInterface {
    id: number,
    title: string,
    desc: string,
    taskStatus: taskStatusType,
    goalTitle: string
}

const taskStatusArray = ['Standby', 'Running', 'Finish', 'Stopped'];
type taskStatusType = typeof taskStatusArray[number];

const TaskPage = memo( () => {
    console.log( 'TaskPage' );

    const goalItemContext = useContext( GoalItemStateContext );
    const taskItemContext = useContext( TaskItemStateContext );
    const modalContext = useContext( ModalStateContext );

    const [titleState, setTitleState] = useState( '' );
    const [descState, setDescState] = useState( '' );
    const [targetGoalState, setTargetGoalState] = useState( '' );
    const [checkedItemList, setCheckedItemList] = useState<number[]>( [] );

    const selectRefObj = createRef<HTMLSelectElement>();

    const count = useMemo( () => {
        return taskItemContext.state.itemCount;
    }, [ taskItemContext.state.itemCount ] );

    // 表示要素一覧配列を生成する
    const itemList = useMemo( (): TaskItemInterface[] => {
        const returnArray: TaskItemInterface[] = Object.values( taskItemContext.state.itemList );

        return returnArray;
    }, [taskItemContext.state.itemList] );

    // パネルに渡すrefオブジェクトの配列
    const panelRefObjArray = useMemo( () => {
        const returnArray: RefObject<HTMLInputElement>[] = [];

        itemList.forEach( () => {
            const panelRef = createRef<HTMLInputElement>();
            returnArray.push( panelRef );
        } );

        return returnArray;
    }, [itemList] );

    // タスクを紐づける目標のタイトル一覧
    const goalItemArray = useMemo( () => {
        const goalItemStateObj = goalItemContext.state;
        const selectOptionList = [];

        for ( let goalItemIndex in goalItemStateObj ) {
            selectOptionList.push( goalItemStateObj[goalItemIndex].title );
        }

        return selectOptionList;
    }, [goalItemContext] );

    // タスク追加ボタンの活性判定フラグ
    const addTaskBtnDisabledFlag = useMemo( () => {
        return (
            titleState.length === 0 ||
            descState.length === 0 ||
            goalItemArray.indexOf( targetGoalState ) === -1
        );
    }, [titleState, descState, targetGoalState, goalItemArray] );

    // チェックされているパネルが1つの時falseになるフラグ
    const btnActiveSingularFlag = useMemo( () => {
        return checkedItemList.length !== 1;
    }, [checkedItemList] );

    // チェックされているパネルが1つ以上の時falseになるフラグ
    const btnActiveMultipleFlag = useMemo( () => {
        return checkedItemList.length === 0;
    }, [checkedItemList] );

    const uncheckedPanel = useCallback( () => {
        setCheckedItemList( [] );
        panelRefObjArray.forEach( ( inputRefObj ) => {
            if ( inputRefObj.current ) {
                inputRefObj.current.checked = false;
            }
        } );
    }, [panelRefObjArray] );

    const titleInputChangeHandler: ChangeEventHandler = useCallback( ( event: ChangeEvent<HTMLInputElement> ) => {
        setTitleState( event.target.value );
    }, [] );

    const descInputChangeHandler: ChangeEventHandler = useCallback( ( event: ChangeEvent<HTMLInputElement> ) => {
        setDescState( event.target.value );
    }, [] );

    const changeSelectHandler: ChangeEventHandler = useCallback( ( event: ChangeEvent<HTMLSelectElement> ) => {
        setTargetGoalState( event.target.value );
    }, [] );

    // 新規タスクを追加する処理
    const addBtnClickHandler: MouseEventHandler = useCallback( () => {
        taskItemContext.dispatch( {
            type: 'ADD_TASK_ITEM',
            payload: [
                {
                    id: count,
                    title: titleState,
                    desc: descState,
                    taskStatus: 'Standby',
                    goalTitle: targetGoalState
                }
            ],
            itemCount: count
        } );

        setTitleState( '' );
        setDescState( '' );

        if (
            selectRefObj &&
            selectRefObj.current
        ) {
            selectRefObj.current.selectedIndex = 0;
        }
    }, [taskItemContext, count, titleState, descState, targetGoalState, selectRefObj] );

    // 対象タスクを編集する処理
    const editBtnClickHandler: MouseEventHandler = useCallback( () => {
        const checkedItemIndex = checkedItemList[0];
        const { id, title, desc, taskStatus, goalTitle } = taskItemContext.state.itemList[checkedItemIndex];

        modalContext.dispatch( {
            type: 'EDIT_TASK_ITEM',
            payload: {
                id,
                title,
                desc,
                panelStatus: taskStatus,
                goalTitle
            }
        } );

        uncheckedPanel();
    }, [checkedItemList, taskItemContext, modalContext, uncheckedPanel] );

    // 対象タスクのステータスを中断に変更する処理
    const stoppedBtnClickHandler: MouseEventHandler = useCallback( () => {
        const payloadArray: TaskItemInterface[] = [];
        checkedItemList.forEach( ( itemId ) => {
            const taskItem = taskItemContext.state.itemList[itemId];
            payloadArray.push( taskItem );
        } );

        taskItemContext.dispatch( {
            type: 'CHANGE_TASK_ITEM_STATUS_STOPPED',
            payload: payloadArray,
        } );

        uncheckedPanel();
    }, [checkedItemList, taskItemContext, uncheckedPanel] );

    // 対象タスクを削除する処理
    const removeBtnClickHandler: MouseEventHandler = useCallback( () => {
        const payloadArray: TaskItemInterface[] = [];
        checkedItemList.forEach( ( itemId ) => {
            const taskItem = taskItemContext.state.itemList[itemId];
            payloadArray.push( taskItem );
        } );

        taskItemContext.dispatch( {
            type: 'DELETE_TASK_ITEM',
            payload: payloadArray
        } );

        uncheckedPanel();
    }, [checkedItemList, taskItemContext, uncheckedPanel] );

    // パネルのチェックボックスを操作した際の処理
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

    useEffect( () => {
        // まだ目標を設定していない場合、目標設定ページへの遷移モーダル表示
        if ( Object.values( goalItemContext.state ).length === 0 ) {
            modalContext.dispatch( {
                type: 'ANNOUNCE_ADD_GOAL'
            } );
        }
    }, [] );

    return (
        <Fragment>
            <Heading htmlHeadingTag={'h1'} text={'Task'} />

            <p>目標を達成するためのタスクを追加しよう！</p>

            <div className="taskInputArea">
                <TextInput
                    inputType="input"
                    inputValue={titleState}
                    labelText="タスクのタイトル"
                    placeholder="○○の本を読む！"
                    changeInputHandler={titleInputChangeHandler} />

                <TextInput
                    inputType="input"
                    inputValue={descState}
                    labelText="タスクの内容"
                    placeholder="△△の資格を取る為に必要な○○の本を読む！"
                    changeInputHandler={descInputChangeHandler} />

                <Select
                    options={goalItemArray}
                    selectValue={targetGoalState}
                    labelText="達成したい目標"
                    defaultText="達成したい目標を選択してください。"
                    changeInputHandler={changeSelectHandler}
                    selectRef={selectRefObj} />
            </div>

            <ul className="btnArea">
                <li className="btnArea__item">
                    <Button
                        btnText="新しいタスクを追加する"
                        clickHandler={addBtnClickHandler}
                        disabled={addTaskBtnDisabledFlag} />
                </li>

                <li className="btnArea__item">
                    <Button
                        btnText="対象のタスクを編集する"
                        clickHandler={editBtnClickHandler}
                        disabled={btnActiveSingularFlag} />
                </li>

                <li className="btnArea__item">
                    <Button
                        btnText="対象のタスクを中断する"
                        clickHandler={stoppedBtnClickHandler}
                        disabled={btnActiveMultipleFlag} />
                </li>

                <li className="btnArea__item">
                    <Button
                        btnText="対象のタスクを削除する"
                        clickHandler={removeBtnClickHandler}
                        disabled={btnActiveMultipleFlag} />
                </li>
            </ul>

            <ul className="panelArea">
                {
                    itemList.map( ( itemObj, index ) => {
                        return (
                            <li className="panelArea__item" key={itemObj.id}>
                                <Panel
                                    panelID={itemObj.id}
                                    panelTitle={itemObj.title}
                                    panelDesc={itemObj.desc}
                                    panelStatus={itemObj.taskStatus}
                                    goalTitle={itemObj.goalTitle}
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

export default TaskPage;
