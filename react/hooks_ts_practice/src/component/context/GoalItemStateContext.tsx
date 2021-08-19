import {
    PropsWithChildren,
    Reducer,
    Dispatch,
    ReducerAction,
    createContext,
    useReducer
} from 'react';

const panelStatusArray = ['Standby', 'Running', 'Finish', 'Stopped'];
type panelStatusType = typeof panelStatusArray[number];

interface GoalItemInterface {
    id: number,
    title: string,
    desc: string,
    panelStatus: panelStatusType,
    hasTaskNum: number,
    finishedTaskNum: number
}

interface GoalItemStateInterface {
    [key: number]: GoalItemInterface
}

interface ReducerActions {
    type: 'ADD_GOAL_ITEM' |
            'CHANGE_GOAL_ITEM_STATE' |
            'CHANGE_GOAL_ITEM_STATUS_RUNNING' |
            'CHANGE_GOAL_ITEM_STATUS_FINISH' |
            'CHANGE_GOAL_ITEM_STATUS_STOPPED'
    payload: GoalItemInterface[]
}

interface ContextInterface {
    state: GoalItemStateInterface,
    dispatch: Dispatch<ReducerAction<Reducer<any, any>>>
}

// localStorage内の一覧を初期値として取得する。（localStorageにGOAL_ITEMが存在しない場合、新規で作成する。）
let initialState: GoalItemStateInterface = {};
const localItem = localStorage.getItem( 'GOAL_ITEM' );
if ( localItem !== null ) {
    initialState = JSON.parse( localItem );
} else {
    localStorage.setItem( 'GOAL_ITEM', JSON.stringify({}) );
}

let mergeState: GoalItemStateInterface;

const goalItemStateReducer: Reducer<GoalItemStateInterface, ReducerActions> = ( prevState, { type, payload } ): GoalItemStateInterface => {
    const goalLocalItemString = localStorage.getItem( 'GOAL_ITEM' );
    const goalLocalItemObj = goalLocalItemString !== null && JSON.parse( goalLocalItemString );

    let panelStatus: panelStatusType;

    switch ( type ) {
        case 'ADD_GOAL_ITEM':
            break;

        case 'CHANGE_GOAL_ITEM_STATE':
            break;

        case 'CHANGE_GOAL_ITEM_STATUS_RUNNING':
            panelStatus = 'Running';
            break;

        case 'CHANGE_GOAL_ITEM_STATUS_FINISH':
            panelStatus = 'Finish';
            break;

        case 'CHANGE_GOAL_ITEM_STATUS_STOPPED':
            panelStatus = 'Stopped';
            break;
    }

    const payloadObj: GoalItemStateInterface = [];
    payload.forEach( ( taskItem ) => {
        const id = taskItem.id;

        if ( panelStatus ) {
            taskItem.panelStatus = panelStatus;
        }

        payloadObj[id] = taskItem;
    } );

    mergeState = { ...goalLocalItemObj, ...payloadObj };
    localStorage.setItem( 'GOAL_ITEM', JSON.stringify( mergeState ) );

    return mergeState;
}

const GoalItemStateContext = createContext<ContextInterface>( {} as ContextInterface );

const GoalItemContextProvider = ( { children }: PropsWithChildren<{}>) => {
    const [state, dispatch] = useReducer( goalItemStateReducer, initialState );

    return (
        <GoalItemStateContext.Provider value={{ state, dispatch }}>
            { children }
        </GoalItemStateContext.Provider>
    );
}

export { GoalItemContextProvider, GoalItemStateContext };
