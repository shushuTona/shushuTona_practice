/**
 * HomePage
 *
 * 機能
 * ・完了した目標の一覧表示
 * ・最近追加した目標とタスクの表示
 */
import {
    memo,
    Fragment,
    useContext,
    useMemo,
    useEffect
} from 'react';

import { Link } from 'react-router-dom';

// Context
import { GoalItemStateContext } from '@/component/context/GoalItemStateContext';
import { TaskItemStateContext } from '@/component/context/TaskItemStateContext';
import { ModalStateContext } from '@/component/context/ModalContext';

// Module
import { Heading } from '@/component/module/Heading';
import { List } from '@/component/module/List';

const HomePage = memo( () => {
    console.log( 'HomePage' );

    const goalItemContext = useContext( GoalItemStateContext );
    const taskItemContext = useContext( TaskItemStateContext );
    const modalContext = useContext( ModalStateContext );

    // 達成した目標一覧
    const finishGoalItemList = useMemo( () => {
        const goalItemState = goalItemContext.state;
        const goalItemArray = [];

        for ( const index in goalItemState ) {
            const goalItem = goalItemState[index];

            if (
                goalItem.finishedTaskNum !== 0 &&
                goalItem.finishedTaskNum === goalItem.hasTaskNum
            ) {
                goalItemArray.push( goalItem );
            }
        }

        return goalItemArray.length === 0 ?
                    <p>まだ達成した目標はありません！タスクをガンガン達成していこう！</p> :
                    (
                        <Fragment>
                            <p>これらの目標を達成しました！最高だ！</p>
                            <List textList={
                                goalItemArray.map( ( goalItem ) => {
                                    return goalItem.title;
                                } )
                            } />
                        </Fragment>
                    )
    }, [goalItemContext.state] );

    // 直近追加した目標名
    const addGoalItemList = useMemo( () => {
        const goalItemList = Object.values( goalItemContext.state );

        if ( goalItemList.length === 0 ) {
            return <p>まだ目標は追加されてません！<Link to="/goals">目標</Link>を追加しよう！</p>;
        }

        let showTaskIndex = 0;
        for ( const goalObj of goalItemList ) {
            const id = goalObj.id;

            if ( id >= showTaskIndex ) {
                showTaskIndex = id;
            }
        }

        return <Fragment>
            <List textList={
                [goalItemList[showTaskIndex].title]
            } />
        </Fragment>
    }, [goalItemContext.state] );

    // 直近追加したタスク名
    const addTaskItemList = useMemo( () => {
        const taskItemList = Object.values( taskItemContext.state.itemList );

        if ( taskItemList.length === 0 ) {
            return <p>まだタスクは追加されてません！<Link to="/task">タスク</Link>を追加しよう！</p>;
        }

        let showTaskIndex = 0;
        for ( const taskObj of taskItemList ) {
            const id = taskObj.id;

            if ( id >= showTaskIndex ) {
                showTaskIndex = id;
            }
        }

        return <Fragment>
            <List textList={
                [taskItemContext.state.itemList[showTaskIndex].title]
            } />
        </Fragment>
    }, [taskItemContext.state] );

    // 初回ログイン時のモーダル表示
    useEffect( () => {
        const firstLoginFlag = localStorage.getItem( 'FIRST_LOGIN_FLAG' );

        if ( !firstLoginFlag ) {
            modalContext.dispatch( {
                type: 'ANNOUNCE_FIRST_LOGIN'
            } );

            localStorage.setItem( 'FIRST_LOGIN_FLAG', 'true' );
        }
    } );

    // タスクの数・完了数によって目標に紐付くタスク数を更新する
    useEffect( () => {
        goalItemContext.updateTaskNum();
    }, [] );

    return (
        <Fragment>
            <Heading htmlHeadingTag={'h1'} text={'Home'} />

            <Heading htmlHeadingTag={'h2'} text={'達成した目標'} />
            {
                finishGoalItemList
            }

            <Heading htmlHeadingTag={'h2'} text={'最近追加した目標'} />
            {
                addGoalItemList
            }

            <Heading htmlHeadingTag={'h2'} text={'最近追加したタスク'} />
            {
                addTaskItemList
            }
        </Fragment>
    );
} );

export default HomePage;
