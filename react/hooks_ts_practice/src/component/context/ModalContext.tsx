import {
    createContext,
    useReducer,
    PropsWithChildren,
    Reducer,
    Dispatch,
    ReducerAction,
    lazy
} from 'react';

interface ModalReducerState {
    isModalShow: boolean,
    isModalHidden: boolean,
    modalContentsComponent: JSX.Element
}

interface EditGoalItemProps {
    id: number,
    title: string,
    desc: string,
    panelStatus: 'Standby' | 'Running' | 'Finish' | 'Stopped'
}

interface ModalReducerActions {
    type: 'EDIT_GOAL_ITEM' | 'CLOSE_MODAL',
    payload?: EditGoalItemProps
}

interface ContextInterface {
    state: ModalReducerState,
    dispatch: Dispatch<ReducerAction<Reducer<any, any>>>
}

const modalStateReducer: Reducer<ModalReducerState, ModalReducerActions> = ( prevState, { type, payload } ) => {
    console.log( payload );
    let mergeState: ModalReducerState;

    switch ( type ) {
        case 'EDIT_GOAL_ITEM':
            const { id, title, desc, panelStatus } = payload as EditGoalItemProps;

            // propsの値がキャッシュされる（？）から都度importする
            const EditGoalItemModalContents = lazy( () => import( '../layout/modalContents/EditGoalItemModalContents' ) );

            mergeState = { ...prevState, ...{
                    isModalShow: true,
                    isModalHidden: false,
                    modalContentsComponent: <EditGoalItemModalContents id={id} title={title} desc={desc} panelStatus={panelStatus} />
                }
            };

            console.log( mergeState );

            return mergeState;

        case 'CLOSE_MODAL':
            mergeState = {
                ...prevState, ...{
                    isModalShow: false,
                    isModalHidden: true
                }
            };
            console.log( mergeState );

            return mergeState;
    }
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
