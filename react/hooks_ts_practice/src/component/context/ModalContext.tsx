import {
    createContext,
    useReducer,
    PropsWithChildren,
    Reducer,
    Dispatch,
    ReducerAction,
    lazy
} from 'react';

const panelStatusArray = ['Standby', 'Running', 'Finish', 'Stopped'];
type panelStatusType = typeof panelStatusArray[number];

interface ModalReducerState {
    isModalShow: boolean,
    isModalHidden: boolean,
    modalContentsComponent: JSX.Element
}

interface EditItemProps {
    id: number,
    title: string,
    desc: string,
    panelStatus: panelStatusType
}

interface ModalReducerActions {
    type: 'EDIT_GOAL_ITEM' |
            'EDIT_TASK_ITEM' |
            'CLOSE_MODAL',
    payload?: EditItemProps
}

interface ContextInterface {
    state: ModalReducerState,
    dispatch: Dispatch<ReducerAction<Reducer<any, any>>>
}

const modalStateReducer: Reducer<ModalReducerState, ModalReducerActions> = ( prevState, { type, payload } ) => {
    let mergeState: ModalReducerState;
    let payloadObj: ModalReducerState;

    if ( payload ) {
        const { id, title, desc, panelStatus } = payload;

        switch ( type ) {
            case 'EDIT_GOAL_ITEM':
                // propsの値がキャッシュされる（？）から都度importする
                const EditGoalItemModalContents = lazy( () => import( '../layout/modalContents/EditGoalItemModalContents' ) );
                payloadObj = {
                    isModalShow: true,
                    isModalHidden: false,
                    modalContentsComponent: <EditGoalItemModalContents id={id} title={title} desc={desc} panelStatus={panelStatus} />
                };
                break;

            case 'EDIT_TASK_ITEM':
                const EditTaskItemModalContents = lazy( () => import( '../layout/modalContents/EditTaskItemModalContents' ) );
                payloadObj = {
                    isModalShow: true,
                    isModalHidden: false,
                    modalContentsComponent: <EditTaskItemModalContents id={id} title={title} desc={desc} taskStatus={panelStatus} />
                };
                break;

            default:
                payloadObj = {
                    isModalShow: false,
                    isModalHidden: false,
                    modalContentsComponent: <p>Modal Contents.</p>
                }
        }

        mergeState = {...prevState, ...payloadObj};

        console.log( mergeState );

        return mergeState;
    } else if (
        type === 'CLOSE_MODAL'
    ) {
        mergeState = {
            ...prevState, ...{
                isModalShow: false,
                isModalHidden: true
            }
        };
        console.log( mergeState );

        return mergeState;
    }

    return prevState;
}

const initialState: ModalReducerState = {
    isModalShow: false,
    isModalHidden: false,
    modalContentsComponent: <p>Modal Contents.</p>
}

const ModalStateContext = createContext<ContextInterface>( {} as ContextInterface );

const ModalStateContextProvider = ( { children }: PropsWithChildren<{}> ) => {
    const [state, dispatch] = useReducer( modalStateReducer, initialState );

    return (
        <ModalStateContext.Provider value={ { state, dispatch } }>
            { children }
        </ModalStateContext.Provider>
    )
}

export { ModalStateContextProvider, ModalStateContext };
