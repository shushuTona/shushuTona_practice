import {
    PropsWithChildren,
    createContext,
    Reducer,
    ReducerAction,
    Dispatch,
    useReducer
} from 'react';

const taskStatusArray = ['Standby', 'Running', 'Finish', 'Stopped'];
type taskStatusType = typeof taskStatusArray[number];

interface TaskItemInterface {
    id: number,
    title: string,
    desc: string,
    taskStatus: taskStatusType,
    goalTitle: string
}

interface TaskItemStateInterface {
    itemCount: number,
    itemList: {
        [key: number]: TaskItemInterface
    }
}

interface ReducerActions {
    type: 'ADD_TASK_ITEM' |
    'DELETE_TASK_ITEM' |
    'CHANGE_TASK_ITEM_STATE' |
    'CHANGE_TASK_ITEM_STATUS_RUNNING' |
    'CHANGE_TASK_ITEM_STATUS_FINISH' |
    'CHANGE_TASK_ITEM_STATUS_STOPPED'
    payload: TaskItemInterface[],
    itemCount?: number
}

interface ContextInterface {
    state: TaskItemStateInterface,
    dispatch: Dispatch<ReducerAction<Reducer<any, any>>>
}

// localStorage内の一覧を初期値として取得する。（localStorageにTASK_ITEMが存在しない場合、新規で作成する。）
let initialState: TaskItemStateInterface = {
    itemCount: 0,
    itemList: {}
};
const localItem = localStorage.getItem( 'TASK_ITEM' );
if ( localItem !== null ) {
    initialState = JSON.parse( localItem );
} else {
    localStorage.setItem( 'TASK_ITEM', JSON.stringify( initialState ) );
}

let mergeState: TaskItemStateInterface;

const taskItemStateReducer: Reducer<TaskItemStateInterface, ReducerActions> = ( prevState, { type, payload, itemCount } ) => {
    const localItemString = localStorage.getItem( 'TASK_ITEM' );
    const localItemObj = localItemString !== null && JSON.parse( localItemString );

    const payloadObj: TaskItemStateInterface = {
        itemCount: itemCount !== undefined ? itemCount : prevState.itemCount,
        itemList: {}
    };
    let panelStatus: taskStatusType;
    let updateItemCount = prevState.itemCount;

    switch ( type ) {
        case 'ADD_TASK_ITEM':
            updateItemCount = prevState.itemCount + 1;
            break;

        case 'DELETE_TASK_ITEM':
            payload.forEach( ( taskItem ) => {
                const id = taskItem.id;
                delete localItemObj.itemList[id];
            } );

            localStorage.setItem( 'TASK_ITEM', JSON.stringify( localItemObj ) );

            return localItemObj;

        case 'CHANGE_TASK_ITEM_STATE':
            break;

        case 'CHANGE_TASK_ITEM_STATUS_RUNNING':
            panelStatus = 'Running';
            break;

        case 'CHANGE_TASK_ITEM_STATUS_FINISH':
            panelStatus = 'Finish';
            break;

        case 'CHANGE_TASK_ITEM_STATUS_STOPPED':
            panelStatus = 'Stopped';
            break;
    }

    payload.forEach( ( taskItem ) => {
        const id = taskItem.id;

        if ( panelStatus ) {
            taskItem.taskStatus = panelStatus;
        }

        payloadObj.itemList[id] = taskItem;
    } );

    mergeState = {
        itemList: { ...localItemObj.itemList, ...payloadObj.itemList },
        itemCount: updateItemCount
    };
    localStorage.setItem( 'TASK_ITEM', JSON.stringify( mergeState ) );

    return mergeState;
}

const TaskItemStateContext = createContext<ContextInterface>( {} as ContextInterface );

const TaskItemContextProvider = ( { children }: PropsWithChildren<{}> ) => {
    const [state, dispatch] = useReducer( taskItemStateReducer, initialState);

    return (
        <TaskItemStateContext.Provider value={{ state, dispatch }}>
            { children }
        </TaskItemStateContext.Provider>
    );
}

export { TaskItemContextProvider, TaskItemStateContext };
