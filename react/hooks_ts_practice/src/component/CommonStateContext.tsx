import React, { ReducerState, Reducer, Dispatch, ReducerAction, createContext, useReducer } from 'react';

interface ContextInterface {
    state: ReducerState<Reducer<any, any>>,
    dispatch: Dispatch<ReducerAction<Reducer<any, any>>>
}

interface GoalItemInterface {
    id: string,
    title: string,
    desc: string,
    taskIdList: string[]
}

interface TaskItemInterface {
    id: string,
    title: string,
    desc: string,
}

interface InitialStateInterface {
    goalItem: {
        [key: string]: GoalItemInterface
    },
    taskItem: {
        [key: string]: TaskItemInterface
    }
}

interface ReducerActions {
    type: 'ADD_GOAL_STATE' | 'CHANGE_GOAL_STATE' | 'ADD_TASK_STATE' | 'CHANGE_TASK_STATE'
    payload: InitialStateInterface
}

const commonStateContext = createContext<ContextInterface>( {} as ContextInterface );

const initialState: InitialStateInterface = {
    goalItem: {},
    taskItem: {}
}

const commonStateReducer = ( state: InitialStateInterface, action: ReducerActions ) => {
    switch ( action.type ) {
        case 'ADD_GOAL_STATE':
            return { ...state, ...action.payload };

        case 'CHANGE_GOAL_STATE':
            return { ...state, ...{ piyo: 500 } };

        case 'ADD_TASK_STATE':
            return { ...state, ...action.payload };

        case 'CHANGE_TASK_STATE':
            return { ...state, ...{ piyo: 500 } };

        default:
            return state;
    }
}

const CommonContextProvider = ( { children }: React.PropsWithChildren<{}>) => {
    const [state, dispatch] = useReducer( commonStateReducer, initialState );

    return (
        <commonStateContext.Provider value={{ state, dispatch }}>
            { children }
        </commonStateContext.Provider>
    );
}

export { CommonContextProvider, commonStateContext };
