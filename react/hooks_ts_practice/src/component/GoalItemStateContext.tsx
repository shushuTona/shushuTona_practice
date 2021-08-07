import React, { ReducerState, Reducer, Dispatch, ReducerAction, createContext, useReducer } from 'react';

interface ContextInterface {
    state: ReducerState<Reducer<any, any>>,
    dispatch: Dispatch<ReducerAction<Reducer<any, any>>>
}

interface GoalItemInterface {
    id: number,
    title: string,
    desc: string,
    hasTaskNum: number
}

interface InitialStateInterface {
    [key: number]: GoalItemInterface
}

interface ReducerActions {
    type: 'ADD_GOAL_STATE' | 'CHANGE_GOAL_STATE'
    payload: GoalItemInterface
}

let initialState: InitialStateInterface = {};
const localItem = localStorage.getItem( 'GOAL_ITEM' );
if ( localItem !== null ) {
    initialState = JSON.parse( localItem );
} else {
    localStorage.setItem( 'GOAL_ITEM', JSON.stringify({}) );
}

const commonStateReducer = ( state: InitialStateInterface, { type, payload }: ReducerActions ) => {
    const localItemString = localStorage.getItem( 'GOAL_ITEM' );
    const localItemObj = localItemString !== null && JSON.parse( localItemString );

    const id = payload.id;
    const payloadObj = {
        [id]: payload
    };

    switch ( type ) {
        case 'ADD_GOAL_STATE':
            // 各コンポーネントのhooksでstateをdepsとして指定しているから、新しいオブジェクトをreturnする
            const mergeState = { ...localItemObj, ...payloadObj };
            localStorage.setItem( 'GOAL_ITEM', JSON.stringify( mergeState ) );

            return mergeState;

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
