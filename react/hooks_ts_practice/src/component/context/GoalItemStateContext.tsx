import React, { ReducerState, Reducer, Dispatch, ReducerAction, createContext, useReducer } from 'react';

interface ContextInterface {
    state: ReducerState<Reducer<any, any>>,
    dispatch: Dispatch<ReducerAction<Reducer<any, any>>>
}

interface GoalItemInterface {
    id: number,
    title: string,
    desc: string,
    panelStatus: 'Standby' | 'Running' | 'Finish' | 'Stopped',
    hasTaskNum: number,
    finishedTaskNum: number
}

interface InitialStateInterface {
    [key: number]: GoalItemInterface
}

interface ReducerActions {
    type: 'ADD_GOAL_ITEM' |
            'CHANGE_GOAL_ITEM_STATE' |
            'CHANGE_GOAL_ITEM_STATUS_RUNNING' |
            'CHANGE_GOAL_ITEM_STATUS_FINISH' |
            'CHANGE_GOAL_ITEM_STATUS_STOPPED'
    payload: GoalItemInterface
}

// localStorage内の一覧を初期値として取得する。（localStorageにGOAL_ITEMが存在しない場合、新規で作成する。）
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

    console.log( localItemObj[id] );

    switch ( type ) {
        case 'ADD_GOAL_ITEM':
            // 各コンポーネントのhooksでstateをdepsとして指定しているから、新しいオブジェクトをreturnする
            const mergeState = { ...localItemObj, ...payloadObj };
            localStorage.setItem( 'GOAL_ITEM', JSON.stringify( mergeState ) );

            return mergeState;

        // case 'CHANGE_GOAL_ITEM_STATE':
        // return '';

        case 'CHANGE_GOAL_ITEM_STATUS_RUNNING':
            localItemObj[id].panelStatus = 'Standby';
            localStorage.setItem( 'GOAL_ITEM', JSON.stringify( localItemObj ) );
            return localItemObj;

        case 'CHANGE_GOAL_ITEM_STATUS_FINISH':
            localItemObj[id].panelStatus = 'Finish';
            localStorage.setItem( 'GOAL_ITEM', JSON.stringify( localItemObj ) );
            return localItemObj;

        case 'CHANGE_GOAL_ITEM_STATUS_STOPPED':
            localItemObj[id].panelStatus = 'Stopped';
            localStorage.setItem( 'GOAL_ITEM', JSON.stringify( localItemObj ) );
            return localItemObj;

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
