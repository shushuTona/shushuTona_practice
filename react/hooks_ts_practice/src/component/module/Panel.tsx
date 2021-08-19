import React, { ChangeEventHandler, ChangeEvent, MouseEventHandler, useEffect, useCallback, useRef, RefObject } from 'react';
import './css/Panel.css';

const panelStatusArray = ['Standby', 'Running', 'Finish', 'Stopped'];
type panelStatusType = typeof panelStatusArray[number];

interface Props {
    panelID: number,
    panelTitle: string,
    panelDesc: string,
    panelStatus: panelStatusType,
    panelHasTaskNum?: number,
    panelFinishedTaskNum?: number,
    goalTitle?: string,
    inputRef?: RefObject<HTMLInputElement>
    changePanelHandler: ( panelID: number, checked: boolean ) => void
}

const Panel = React.memo( ( {
    panelID,
    panelTitle,
    panelDesc,
    panelStatus,
    panelHasTaskNum,
    panelFinishedTaskNum,
    goalTitle,
    inputRef,
    changePanelHandler
}: Props ) => {
    console.log( 'Panel' );

    const rootRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const panelInnerRef = useRef<HTMLDivElement>( null );

    const clickHandler: MouseEventHandler<HTMLButtonElement> = useCallback( () => {
        if (
            rootRef.current &&
            panelRef.current &&
            panelInnerRef.current
        ) {
            if ( rootRef.current.classList.contains( 'is-open' ) ) {
                panelRef.current.style.height = `${panelInnerRef.current.clientHeight}px`;

                setTimeout( () => {
                    if (
                        rootRef.current &&
                        panelRef.current &&
                        panelInnerRef.current
                    ) {
                        panelRef.current.style.height = `0`;
                    }
                }, 50 );
            } else {
                panelRef.current.style.height = `0`;

                setTimeout( () => {
                    if (
                        rootRef.current &&
                        panelRef.current &&
                        panelInnerRef.current
                    ) {
                        panelRef.current.style.height = `${panelInnerRef.current.clientHeight}px`;
                        rootRef.current.classList.add( 'is-open' );
                    }
                }, 50);
            }
        }
    }, [] );

    const inputChangeHandler: ChangeEventHandler = useCallback( ( event: ChangeEvent<HTMLInputElement> ) => {
        changePanelHandler( panelID, event.target.checked );
    }, [panelID, changePanelHandler] );

    // 初回表示用のアニメーション後に該当classを削除する
    useEffect( () => {
        if (
            rootRef.current &&
            panelRef.current &&
            panelInnerRef.current
        ) {
            const animationendHandler = ( event: Event ) => {
                rootRef.current?.classList.remove( 'is-show' );

                rootRef.current?.removeEventListener( 'animationend', animationendHandler );
            }

            rootRef.current.addEventListener( 'animationend', animationendHandler );

            // パネルの開閉トランジション後の処理
            panelRef.current.addEventListener( 'transitionend', ( event ) => {
                if (
                    rootRef.current &&
                    panelRef.current &&
                    panelInnerRef.current
                ) {
                    if ( panelRef.current.clientHeight === 0 ) {
                        rootRef.current.classList.remove( 'is-open' );
                    } else if ( rootRef.current.classList.contains( 'is-open' )) {
                        panelRef.current.style.height = 'auto';
                    }
                }
            } );
        }
    }, [] );

    return (
        <div className="m-panel is-show" ref={rootRef}>
            <div className="panel__inner">
                <div className="panel__title">
                    <input id={`panel-${panelID}`} className="panel__input" type="checkbox" onChange={inputChangeHandler} ref={inputRef} />
                    <label className="panel__inputLabel" htmlFor={`panel-${panelID}`}></label>
                    <button className="panel__btn" type="button" onClick={clickHandler}>
                        <span className="panel__status">{panelStatus}</span>
                        <span className="panel__title">{panelTitle}</span>
                    </button>
                </div>

                <div className="panel__desc" ref={panelRef}>
                    <div className="panel__descInner" ref={panelInnerRef}>
                        {
                            // 目標のパネルを表示
                            panelHasTaskNum !== undefined ?
                                (
                                    panelHasTaskNum > 0 ?
                                        (
                                            <p className="panel__taskDesc">
                                                <span className="panel__taskDescText">完了したタスク数</span>：
                                                <span className="panel__taskNum">{panelFinishedTaskNum}</span>  / <span className="panel__taskNum">{panelHasTaskNum}</span>
                                            </p>
                                        ) :
                                        (
                                            <p className="panel__taskDesc">
                                                <span className="panel__taskDescText">この目標にタスクは紐付けされていないです。<br />Taskページから目標を達成するためのタスクを追加しよう！</span>
                                            </p>
                                        )
                                ) : ''
                        }
                        {
                            // タスクのパネルを表示
                            goalTitle ?
                                (
                                    <p className="panel__taskDesc">
                                        <span className="panel__taskDescText">達成したい目標：{goalTitle}</span>
                                    </p>
                                ): ''
                        }
                        <p className="panel__descContents"><span>{ goalTitle ? 'タスク' : '目標' }を達成したい理由</span>{panelDesc}</p>
                    </div>
                </div>
            </div>
        </div>
    );
} );

export { Panel };
