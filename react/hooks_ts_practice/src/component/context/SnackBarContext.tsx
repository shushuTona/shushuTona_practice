import {
    Dispatch,
    ReducerAction,
    PropsWithChildren,
    createContext,
    Reducer,
    useCallback,
    useReducer,
} from 'react';

interface SnackBarReducerState {
    isSnackBarShow: boolean,
    snackBarHeading: string,
    snackBarContents: string
}

interface SnackBarReducerActions {
    type: 'CHANGE_SNACK_BAR_CONTENTS',
    payload: SnackBarReducerState
}

type showSnackBarPayload = Omit<SnackBarReducerState, 'isSnackBarShow'>;

interface ContextInterface {
    state: SnackBarReducerState,
    dispatch: Dispatch<ReducerAction<Reducer<any, any>>>,
    showSnackBar( payload: showSnackBarPayload ): void
}

const snackBarStateReducer: Reducer<SnackBarReducerState, SnackBarReducerActions> = ( prevState, { type, payload } ) => {
    return { ...prevState, ...payload };
}

const initialState: SnackBarReducerState = {
    isSnackBarShow: false,
    snackBarHeading: '',
    snackBarContents: ''
}

const SnackBarStateContext = createContext<ContextInterface>( {} as ContextInterface );

const SnackBarContextProvider = ( { children }: PropsWithChildren<{}>) => {
    const [state, dispatch] = useReducer( snackBarStateReducer, initialState );

    const showSnackBar = useCallback( ( payload: showSnackBarPayload ) => {
        const { snackBarHeading, snackBarContents } = payload;
        const type = 'CHANGE_SNACK_BAR_CONTENTS';

        dispatch( {
            type,
            payload: {
                isSnackBarShow: true,
                snackBarHeading,
                snackBarContents
            }
        } );

        setTimeout( () => {
            dispatch( {
                type,
                payload: {
                    isSnackBarShow: false,
                    snackBarHeading,
                    snackBarContents
                }
            } );
        }, 3500 );
    }, [] );

    return (
        <SnackBarStateContext.Provider value={{ state, dispatch, showSnackBar }}>
            { children }
        </SnackBarStateContext.Provider>
    )
}

export { SnackBarContextProvider, SnackBarStateContext };
