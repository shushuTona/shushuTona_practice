import {
    memo,
    MouseEventHandler,
    ChangeEvent,
    ChangeEventHandler,
    useState,
    useCallback,
    useContext
} from 'react';

import { GoalItemStateContext } from '../../context/GoalItemStateContext';
import { ModalStateContext } from '../../context/ModalContext';

import { TextInput } from '../../module/TextInput';
import { Select } from '../../module/Select';
import { Button } from '../../module/Button';

const panelStatusArray = ['Standby', 'Running', 'Finish', 'Stopped'];
type panelStatusType = typeof panelStatusArray[number];

interface Props {
    id: number,
    title: string,
    desc: string,
    panelStatus: panelStatusType
}

const EditGoalItemModalContents = memo( ( { id, title, desc, panelStatus }: Props ) => {
    const [titleState, setTitleState] = useState( title );
    const [descState, setDescState] = useState( desc );
    const [panelStatusState, setPanelStatusState] = useState( panelStatus );

    const goalItemContext = useContext( GoalItemStateContext );
    const modalContext = useContext( ModalStateContext );

    // 目標タイトル入力変更
    const changeTitleHandler: ChangeEventHandler = useCallback( ( event: ChangeEvent<HTMLInputElement> ) => {
        console.log( 'changeTitleHandler' );
        setTitleState( event.target.value );
    }, [] );

    // 目標達成理由入力変更
    const changeDescHandler: ChangeEventHandler = useCallback( ( event: ChangeEvent<HTMLInputElement> ) => {
        console.log( 'changeDescHandler' );
        setDescState( event.target.value );
    }, [] );

    // 目標状態変更
    const changeSelectHandler: ChangeEventHandler = useCallback( (event: ChangeEvent<HTMLSelectElement>) => {
        console.log( 'changeSelectHandler' );
        const changeValue = event.target.value as panelStatusType;

        console.log( changeValue );

        if (panelStatusArray.indexOf( changeValue ) >= 0) {
            setPanelStatusState( changeValue );
            console.log( panelStatusState );
        }
    }, [panelStatusState] );

    // 編集確定ボタンクリック処理
    const clickChangeFinishBtnHandler: MouseEventHandler = useCallback( () => {
        // 変更した目標内容を更新する処理
        const payload = {
            id,
            title: titleState,
            desc: descState,
            panelStatus: panelStatusState
        }

        console.log( payload );

        goalItemContext.dispatch( {
            type: 'CHANGE_GOAL_ITEM_STATE',
            payload
        } );

        modalContext.dispatch( {
            type: 'CLOSE_MODAL'
        } );
    }, [goalItemContext, modalContext, id, titleState, descState, panelStatusState] );

    // 戻るボタンクリック処理
    const clickChangeReturnBtnHandler: MouseEventHandler = useCallback( () => {
        // モーダルを閉じる処理
        modalContext.dispatch( {
            type: 'CLOSE_MODAL'
        });
    }, [modalContext] );

    return (
        <div className="modal__editGoalItem">
            <TextInput
                inputType="input"
                inputValue={titleState}
                labelText="目標のタイトル"
                placeholder=""
                changeInputHandler={changeTitleHandler} />

            <TextInput
                inputType="textarea"
                inputValue={descState}
                labelText="目標を達成したい理由"
                placeholder=""
                changeInputHandler={changeDescHandler} />

            <Select
                options={panelStatusArray}
                selectValue={panelStatusState}
                labelText="状態"
                changeInputHandler={changeSelectHandler} />

            <div className="modal__btnList">
                <Button btnText="編集確定" clickHandler={clickChangeFinishBtnHandler} />
                <Button btnText="戻る" clickHandler={clickChangeReturnBtnHandler} />
            </div>
        </div>
    )
} );

export default EditGoalItemModalContents;
