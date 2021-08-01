import React, { ChangeEventHandler, MouseEventHandler, useEffect, useCallback, useRef } from 'react';
import './css/Panel.css';

interface Props {
    panelID: string,
    panelTitle: string,
    panelDesc: string,
    panelStatus: 'Standby' | 'Running' | 'Finish',
    panelHasTaskNum: number,
    panelFinishedTaskNum: number,
    changePanelHandler: ChangeEventHandler
}

const Panel = React.memo( ( {
    panelID,
    panelTitle,
    panelDesc,
    panelStatus,
    panelHasTaskNum,
    panelFinishedTaskNum,
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

            panelRef.current.addEventListener( 'transitionend', ( event ) => {
                if (
                    rootRef.current &&
                    panelRef.current &&
                    panelInnerRef.current
                ) {
                    console.log( panelRef.current.style.height );

                    if ( panelRef.current.clientHeight === 0 ) {
                        console.log('閉じた後');

                        rootRef.current.classList.remove( 'is-open' );
                    } else if ( rootRef.current.classList.contains( 'is-open' )) {
                        console.log('開けた後');

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
                    <input id={panelID} className="panel__input" type="checkbox" onChange={changePanelHandler} />
                    <label className="panel__inputLabel" htmlFor={panelID}></label>
                    <button className="panel__btn" type="button" onClick={clickHandler}>
                        <span className="panel__status">{panelStatus}</span>
                        <span>{panelTitle}</span>
                    </button>
                </div>

                <div className="panel__desc" ref={panelRef}>
                    <div className="panel__descInner" ref={panelInnerRef}>
                        {
                            ( panelHasTaskNum > 0 ) ?
                                (
                                    <p className="panel__taskNumDesc">
                                        <span className="panel__taskNumText">完了したタスク数</span>
                                        <span className="panel__taskNum">{panelFinishedTaskNum}</span>  / <span className="panel__taskNum">{panelHasTaskNum}</span> :
                                    </p>
                                ) :
                                (
                                    <p className="panel__taskNumDesc">
                                        <span className="panel__taskNumText">この目標に紐付けされたタスクはまだないです</span>
                                    </p>
                                )
                        }
                        <p className="panel__descContents">{panelDesc}</p>
                    </div>
                </div>
            </div>
        </div>
    );
} );

export { Panel };
