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
    [key: number]: TaskItemInterface
}

interface ReducerActions {
    type: 'ADD_TASK_ITEM' |
    'DELETE_TASK_ITEM' |
    'CHANGE_TASK_ITEM_STATE' |
    'CHANGE_TASK_ITEM_STATUS_RUNNING' |
    'CHANGE_TASK_ITEM_STATUS_FINISH' |
    'CHANGE_TASK_ITEM_STATUS_STOPPED'
    payload: TaskItemInterface[]
}

interface ContextInterface {
    state: TaskItemStateInterface,
    dispatch: Dispatch<ReducerAction<Reducer<any, any>>>
}

// localStorage内の一覧を初期値として取得する。（localStorageにTASK_ITEMが存在しない場合、新規で作成する。）
let initialState: TaskItemStateInterface = {};
const localItem = localStorage.getItem( 'TASK_ITEM' );
if ( localItem !== null ) {
    initialState = JSON.parse( localItem );
} else {
    localStorage.setItem( 'TASK_ITEM', JSON.stringify( {} ) );
}

let mergeState: TaskItemStateInterface;

const taskItemStateReducer: Reducer<TaskItemStateInterface, ReducerActions> = ( prevState, { type, payload } ) => {
    const localItemString = localStorage.getItem( 'TASK_ITEM' );
    const localItemObj = localItemString !== null && JSON.parse( localItemString );

    switch ( type ) {
        case 'ADD_TASK_ITEM':
            break;

        case 'DELETE_TASK_ITEM':
            break;

        case 'CHANGE_TASK_ITEM_STATE':
            break;

        case 'CHANGE_TASK_ITEM_STATUS_RUNNING':
            break;

        case 'CHANGE_TASK_ITEM_STATUS_FINISH':
            break;

        case 'CHANGE_TASK_ITEM_STATUS_STOPPED':
            break;
    }

    let payloadObj: TaskItemStateInterface = {};
    payload.forEach( ( taskItem ) => {
        const id = taskItem.id;
        payloadObj[id] = taskItem;
    } );

    mergeState = { ...localItemObj, ...payloadObj };
    localStorage.setItem( 'TASK_ITEM', JSON.stringify( mergeState ) );

    console.log( mergeState );

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
