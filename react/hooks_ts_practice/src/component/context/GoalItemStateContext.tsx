import {
    VFC,
    ProviderProps,
    Reducer,
    Dispatch,
    ReducerAction,
    createContext,
    useReducer,
    useCallback
} from 'react';

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
    dispatch: Dispatch<ReducerAction<Reducer<any, any>>>,
    updateTaskNum(): void
}

// localStorage内の一覧を初期値として取得する。（localStorageにGOAL_ITEMが存在しない場合、新規で作成する。）
let initialState: GoalItemStateInterface = {};
const localItem = localStorage.getItem( 'GOAL_ITEM' );
if ( localItem !== null ) {
    initialState = JSON.parse( localItem );
} else {
    localStorage.setItem( 'GOAL_ITEM', JSON.stringify( {} ) );
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

const GoalItemContextProvider: VFC<Omit<ProviderProps<ContextInterface>, 'value'>> = ( { children } ) => {
    const [state, dispatch] = useReducer( goalItemStateReducer, initialState );

    // HomeとGoalページを表示する際に、各goalのタスク数を確認＆更新する処理
    const updateTaskNum = useCallback( () => {
        const goalLocalItemString = localStorage.getItem( 'GOAL_ITEM' );
        const taskLocalItemString = localStorage.getItem( 'TASK_ITEM' );
        const goalLocalItemObj = goalLocalItemString !== null && JSON.parse( goalLocalItemString );
        const taskLocalItemObj = taskLocalItemString !== null && JSON.parse( taskLocalItemString );

        const goalHasTaskNumObj: { [key: string]: Omit<GoalItemInterface, 'id' | 'title' | 'desc'> } = {};
        const payloadArray: GoalItemInterface[] = [];

        // 目標のアイテム毎にgoalHasTaskNumObjを初期化
        for ( const goalIndex in goalLocalItemObj ) {
            const goalObj = goalLocalItemObj[goalIndex];

            goalHasTaskNumObj[goalObj.title] = {
                hasTaskNum: 0,
                finishedTaskNum: 0,
                panelStatus: 'Standby'
            }
        }

        // 各目標に紐づくタスクの数とそれたが完了しているかの確認
        for ( const taskIndex in taskLocalItemObj.itemList ) {
            const taskObj = taskLocalItemObj.itemList[taskIndex];
            const { goalTitle } = taskObj;

            if ( !goalHasTaskNumObj[goalTitle] ) {
                goalHasTaskNumObj[goalTitle] = {
                    hasTaskNum: 1,
                    finishedTaskNum: 0,
                    panelStatus: 'Running'
                }
            } else {
                const prevNum = goalHasTaskNumObj[goalTitle].hasTaskNum;
                goalHasTaskNumObj[goalTitle].hasTaskNum = prevNum + 1;
            }

            if ( taskObj.taskStatus === 'Finish' ) {
                const prevNum = goalHasTaskNumObj[goalTitle].finishedTaskNum;
                goalHasTaskNumObj[goalTitle].finishedTaskNum = prevNum + 1;
            }
        }

        // 目標一覧を更新する為のpayloadの配列を作成する
        for ( const goalIndex in goalLocalItemObj ) {
            const goalObj = goalLocalItemObj[goalIndex];

            if ( Object.prototype.hasOwnProperty.call( goalHasTaskNumObj, goalObj.title ) ) {
                if (
                    goalHasTaskNumObj[goalObj.title].finishedTaskNum !== 0 &&
                    goalHasTaskNumObj[goalObj.title].hasTaskNum !== 0 &&
                    goalHasTaskNumObj[goalObj.title].finishedTaskNum === goalHasTaskNumObj[goalObj.title].hasTaskNum
                ) {
                    goalHasTaskNumObj[goalObj.title].panelStatus = 'Finish';
                }

                goalLocalItemObj[goalIndex] = { ...goalLocalItemObj[goalIndex], ...goalHasTaskNumObj[goalObj.title] };
                payloadArray.push( goalLocalItemObj[goalIndex] );
            }
        }

        dispatch( {
            type: 'CHANGE_GOAL_ITEM_STATE',
            payload: payloadArray
        } );
    }, [] );

    return (
        <GoalItemStateContext.Provider value={{ state, dispatch, updateTaskNum }}>
            { children }
        </GoalItemStateContext.Provider>
    );
}

export { GoalItemContextProvider, GoalItemStateContext };
