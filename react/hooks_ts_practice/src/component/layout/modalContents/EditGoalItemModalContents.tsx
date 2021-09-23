import {
    VFC,
    memo,
    MouseEventHandler,
    ChangeEvent,
    ChangeEventHandler,
    useState,
    useCallback,
    useContext,
    useMemo
} from 'react';
// Context
import { GoalItemStateContext } from '@/component/context/GoalItemStateContext';
import { ModalStateContext } from '@/component/context/ModalContext';
import { SnackBarStateContext } from '@/component/context/SnackBarContext';
// Module
import { TextInput } from '@/component/module/TextInput';
import { Select } from '@/component/module/Select';
import { Button } from '@/component/module/Button';

interface Props {
    id: number,
    title: string,
    desc: string,
    panelStatus: panelStatusType
}

const EditGoalItemModalContents: VFC<Props> = memo( ( { id, title, desc, panelStatus } ) => {
    console.log( 'EditGoalItemModalContents' );

    const [titleState, setTitleState] = useState( title );
    const [descState, setDescState] = useState( desc );
    const [panelStatusState, setPanelStatusState] = useState( panelStatus );

    const goalItemContext = useContext( GoalItemStateContext );
    const modalContext = useContext( ModalStateContext );
    const snackBarContexte = useContext( SnackBarStateContext );

    // 目標タイトル入力変更
    const changeTitleHandler: ChangeEventHandler = useCallback( ( event: ChangeEvent<HTMLInputElement> ) => {
        setTitleState( event.target.value );
    }, [] );

    // 目標達成理由入力変更
    const changeDescHandler: ChangeEventHandler = useCallback( ( event: ChangeEvent<HTMLInputElement> ) => {
        setDescState( event.target.value );
    }, [] );

    // 目標状態変更
    const changeSelectHandler: ChangeEventHandler = useCallback( ( event: ChangeEvent<HTMLSelectElement> ) => {
        const changeValue = event.target.value as panelStatusType;
        setPanelStatusState( changeValue );
    }, [] );

    // 編集確定ボタンクリック処理
    const clickChangeFinishBtnHandler: MouseEventHandler = useCallback( () => {
        // 変更した目標内容を更新する処理
        const payload = {
            id,
            title: titleState,
            desc: descState,
            panelStatus: panelStatusState
        }

        goalItemContext.dispatch( {
            type: 'CHANGE_GOAL_ITEM_STATE',
            payload: [
                payload
            ]
        } );

        modalContext.dispatch( {
            type: 'CLOSE_MODAL'
        } );

        snackBarContexte.showSnackBar( {
            snackBarHeading: '選択した目標を編集しました！',
            snackBarContents: '新しい内容でガシガシ目標達成していこう！'
        } );
    }, [goalItemContext, modalContext, id, titleState, descState, panelStatusState, snackBarContexte] );

    // 戻るボタンクリック処理
    const clickChangeReturnBtnHandler: MouseEventHandler = useCallback( () => {
        // モーダルを閉じる処理
        modalContext.dispatch( {
            type: 'CLOSE_MODAL'
        } );
    }, [modalContext] );

    const btnDisabledFlag = useMemo( () => {
        return (
            titleState.length === 0 ||
            descState.length === 0 ||
            panelStatusArray.indexOf( panelStatusState ) === -1
        )
    }, [titleState, descState, panelStatusState] );

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
                defaultText="状態を選択してください。"
                changeInputHandler={changeSelectHandler} />

            <div className="modal__btnList">
                <Button btnText="編集確定" clickHandler={clickChangeFinishBtnHandler} disabled={btnDisabledFlag} />
                <Button btnText="戻る" clickHandler={clickChangeReturnBtnHandler} />
            </div>
        </div>
    )
} );

EditGoalItemModalContents.displayName = 'EditGoalItemModalContents Component';

export default EditGoalItemModalContents;
