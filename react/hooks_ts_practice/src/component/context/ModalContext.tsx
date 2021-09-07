import {
    FC,
    createContext,
    useReducer,
    ProviderProps,
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
    panelStatus: panelStatusType,
    goalTitle: string
}

interface ModalReducerActions {
    type: 'EDIT_GOAL_ITEM' |
            'EDIT_TASK_ITEM' |
            'ANNOUNCE_ADD_GOAL' |
            'ANNOUNCE_FIRST_LOGIN' |
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
        const { id, title, desc, panelStatus, goalTitle } = payload;

        switch ( type ) {
            case 'EDIT_GOAL_ITEM': {
                // propsの値がキャッシュされる（？）から都度importする
                const EditGoalItemModalContents = lazy( () => import( '../layout/modalContents/EditGoalItemModalContents' ) );

                payloadObj = {
                    isModalShow: true,
                    isModalHidden: false,
                    modalContentsComponent: <EditGoalItemModalContents id={id} title={title} desc={desc} panelStatus={panelStatus} />
                };
                break;
            }

            case 'EDIT_TASK_ITEM': {
                const EditTaskItemModalContents = lazy( () => import( '../layout/modalContents/EditTaskItemModalContents' ) );

                payloadObj = {
                    isModalShow: true,
                    isModalHidden: false,
                    modalContentsComponent: <EditTaskItemModalContents id={id} title={title} desc={desc} taskStatus={panelStatus} goalTitle={goalTitle} />
                };
                break;
            }

            default: {
                payloadObj = {
                    isModalShow: false,
                    isModalHidden: false,
                    modalContentsComponent: <p>Modal Contents.</p>
                }
            }
        }

        mergeState = {...prevState, ...payloadObj};

        return mergeState;
    } else {
        switch ( type ) {
            case 'CLOSE_MODAL': {
                mergeState = {
                    ...prevState, ...{
                        isModalShow: false,
                        isModalHidden: true
                    }
                };
                return mergeState;
            }

            case 'ANNOUNCE_ADD_GOAL': {
                const AnnounceAddGoalModalContents = lazy( () => import( '../layout/modalContents/AnnounceAddGoalModalContents' ) );

                mergeState = {
                    ...prevState, ...{
                        isModalShow: true,
                        isModalHidden: false,
                        modalContentsComponent: <AnnounceAddGoalModalContents />
                    }
                };
                return mergeState;
            }

            case 'ANNOUNCE_FIRST_LOGIN': {
                const AnnounceFirstLoginContents = lazy( () => import( '../layout/modalContents/AnnounceFirstLoginContents' ) );

                mergeState = {
                    ...prevState, ...{
                        isModalShow: true,
                        isModalHidden: false,
                        modalContentsComponent: <AnnounceFirstLoginContents />
                    }
                };
                return mergeState;
            }
        }
    }

    return prevState;
}

const initialState: ModalReducerState = {
    isModalShow: false,
    isModalHidden: false,
    modalContentsComponent: <p>Modal Contents.</p>
}

const ModalStateContext = createContext<ContextInterface>( {} as ContextInterface );

const ModalStateContextProvider: FC<Omit<ProviderProps<ContextInterface>, 'value'>> = ( { children } ) => {
    const [state, dispatch] = useReducer( modalStateReducer, initialState );

    return (
        <ModalStateContext.Provider value={ { state, dispatch } }>
            { children }
        </ModalStateContext.Provider>
    )
}

export { ModalStateContextProvider, ModalStateContext };
