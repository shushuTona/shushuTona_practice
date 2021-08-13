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
    payload: GoalItemInterface | GoalItemInterface[]
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
    const localItemString = localStorage.getItem( 'GOAL_ITEM' );
    const localItemObj = localItemString !== null && JSON.parse( localItemString );

    if (
        type === 'ADD_GOAL_ITEM' ||
        type === 'CHANGE_GOAL_ITEM_STATE'
    ) {
        const id = ( payload as GoalItemInterface ).id;
        const payloadObj = {
            [id]: payload
        };

        mergeState = { ...localItemObj, ...payloadObj };
        localStorage.setItem( 'GOAL_ITEM', JSON.stringify( mergeState ) );
        return mergeState;

        // switch ( type ) {
        //     case 'ADD_GOAL_ITEM':
        //         // 各コンポーネントのhooksでstateをdepsとして指定しているから、新しいオブジェクトをreturnする
        //         mergeState = { ...localItemObj, ...payloadObj };

        //         localStorage.setItem( 'GOAL_ITEM', JSON.stringify( mergeState ) );
        //         return mergeState;

        //     case 'CHANGE_GOAL_ITEM_STATE':
        //         mergeState = { ...localItemObj, ...payloadObj };

        //         localStorage.setItem( 'GOAL_ITEM', JSON.stringify( mergeState ) );
        //         return mergeState;
        // }
    } else if (
        Array.isArray( payload ) &&
        (
            type === 'CHANGE_GOAL_ITEM_STATUS_RUNNING' ||
            type === 'CHANGE_GOAL_ITEM_STATUS_FINISH' ||
            type === 'CHANGE_GOAL_ITEM_STATUS_STOPPED'
        )
    ) {
        let panelStatus: panelStatusType;

        switch ( type ) {
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

        let payloadObj: GoalItemStateInterface = {};
        payload.forEach( ( goalItem ) => {
            const id = goalItem.id;
            const setGoalItem = { ...goalItem, panelStatus };

            payloadObj[id] = setGoalItem;
        } );

        mergeState = { ...localItemObj, ...payloadObj };
        localStorage.setItem( 'GOAL_ITEM', JSON.stringify( mergeState ) );

        console.log( mergeState );

        return mergeState;
    }

    return prevState;
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
