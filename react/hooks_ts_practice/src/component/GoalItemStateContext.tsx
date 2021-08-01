import React, { ReducerState, Reducer, Dispatch, ReducerAction, createContext, useReducer } from 'react';

interface ContextInterface {
    state: ReducerState<Reducer<any, any>>,
    dispatch: Dispatch<ReducerAction<Reducer<any, any>>>
}

interface GoalItemInterface {
    id: number,
    title: string,
    desc: string,
    taskNum: number
}

interface InitialStateInterface {
    [key: number]: GoalItemInterface
}

interface ReducerActions {
    type: 'ADD_GOAL_STATE' | 'CHANGE_GOAL_STATE'
    payload: GoalItemInterface
}

const initialState: InitialStateInterface = {}

const commonStateReducer = ( state: InitialStateInterface, { type, payload }: ReducerActions ) => {
    const id = payload.id;
    const payloadObj = {
        [id]: payload
    };

    switch ( type ) {
        case 'ADD_GOAL_STATE':
            // 各コンポーネントのhooksでstateをdepsとして指定しているから、新しいオブジェクトをreturnする
            return { ...state, ...payloadObj};

        default:
            return state;
    }
}

const GoalItemStateContext = createContext<ContextInterface>( {} as ContextInterface );

const GoalItemContextProvider = ( { children }: React.PropsWithChildren<{}>) => {
    const [state, dispatch] = useReducer( commonStateReducer, initialState );

    return (
        <GoalItemStateContext.Provider value={{ state, dispatch }}>
            { children }
        </GoalItemStateContext.Provider>
    );
}

export { GoalItemContextProvider, GoalItemStateContext };
