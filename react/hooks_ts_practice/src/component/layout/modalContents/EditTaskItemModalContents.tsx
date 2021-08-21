import {
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
import { TaskItemStateContext } from '../../context/TaskItemStateContext';
import { ModalStateContext } from '../../context/ModalContext';

// Module
import { TextInput } from '../../module/TextInput';
import { Select } from '../../module/Select';
import { Button } from '../../module/Button';

const panelStatusArray = ['Standby', 'Running', 'Finish', 'Stopped'];
type panelStatusType = typeof panelStatusArray[number];

interface Props {
    id: number,
    title: string,
    desc: string,
    taskStatus: panelStatusType,
    goalTitle: string
}

const EditTaskItemModalContents = memo( ( { id, title, desc, taskStatus, goalTitle }: Props ) => {
    const [titleState, setTitleState] = useState( title );
    const [descState, setDescState] = useState( desc );
    const [taskStatusState, setPanelStatusState] = useState( taskStatus );

    const taskItemContext = useContext( TaskItemStateContext );
    const modalContext = useContext( ModalStateContext );

    const changeTitleHandler: ChangeEventHandler = useCallback( (event: ChangeEvent<HTMLInputElement>) => {
        setTitleState( event.target.value );
    }, [] );

    const changeDescHandler: ChangeEventHandler = useCallback( ( event: ChangeEvent<HTMLInputElement> ) => {
        setDescState( event.target.value );
    }, [] );

    const changeSelectHandler: ChangeEventHandler = useCallback( ( event: ChangeEvent<HTMLSelectElement> ) => {
        console.log( event.target.value );

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
    }, [id, titleState, descState, taskStatusState, goalTitle, taskItemContext, modalContext] );

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
            panelStatusArray.indexOf( taskStatusState ) === -1
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
                options={panelStatusArray}
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

export default EditTaskItemModalContents;
