import {
    VFC,
    memo,
    ChangeEvent,
    ChangeEventHandler,
    MouseEventHandler,
    useState,
    useCallback,
    useContext,
    useMemo,
} from 'react';
// Context
import { TaskItemStateContext } from '@/component/context/TaskItemStateContext';
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
    taskStatus: panelStatusType,
    goalTitle: string
}

const EditTaskItemModalContents: VFC<Props> = memo( ( { id, title, desc, taskStatus, goalTitle } ) => {
    const [titleState, setTitleState] = useState( title );
    const [descState, setDescState] = useState( desc );
    const [taskStatusState, setPanelStatusState] = useState( taskStatus );

    const taskItemContext = useContext( TaskItemStateContext );
    const modalContext = useContext( ModalStateContext );
    const snackBarContexte = useContext( SnackBarStateContext );

    const changeTitleHandler: ChangeEventHandler = useCallback( ( event: ChangeEvent<HTMLInputElement> ) => {
        setTitleState( event.target.value );
    }, [] );

    const changeDescHandler: ChangeEventHandler = useCallback( ( event: ChangeEvent<HTMLInputElement> ) => {
        setDescState( event.target.value );
    }, [] );

    const changeSelectHandler: ChangeEventHandler = useCallback( ( event: ChangeEvent<HTMLSelectElement> ) => {
        setPanelStatusState( event.target.value );
    }, [] );

    const clickChangeFinishBtnHandler: MouseEventHandler = useCallback( () => {
        const payload = {
            id,
            title: titleState,
            desc: descState,
            taskStatus: taskStatusState,
            goalTitle
        }

        taskItemContext.dispatch( {
            type: 'CHANGE_TASK_ITEM_STATE',
            payload: [
                payload
            ]
        } );

        modalContext.dispatch( {
            type: 'CLOSE_MODAL'
        } );

        snackBarContexte.showSnackBar( {
            snackBarHeading: '選択したタスクを編集しました！',
            snackBarContents: '目標達成に向けてタスクをガシガシ進めていこう！'
        } );
    }, [id, titleState, descState, taskStatusState, goalTitle, taskItemContext, modalContext, snackBarContexte] );

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
            statusArray.indexOf( taskStatusState ) === -1
        )
    }, [titleState, descState, taskStatusState] );

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
                options={statusArray}
                selectValue={taskStatusState}
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

EditTaskItemModalContents.displayName = 'EditTaskItemModalContents Component';

export default EditTaskItemModalContents;
