import {
    ReactNode,
    memo,
    MouseEventHandler,
    TransitionEventHandler,
    useCallback,
    useRef
} from "react";

import './css/Disclosure.css';

interface Props {
    title: string,
    children: ReactNode
}

const Disclosure = memo( ( { title, children }: Props ) => {
    const rootRef = useRef<HTMLDListElement>( null );
    const panelRef = useRef<HTMLElement>( null );
    const panelInnerRef = useRef<HTMLDivElement>( null );
    const openClassName = 'is-open';

    const btnClickHandler: MouseEventHandler = useCallback( () => {
        const rootElem = rootRef.current;
        const panelElem = panelRef.current;
        const panelInnerElem = panelInnerRef.current;

        if (
            rootElem &&
            panelElem &&
            panelInnerElem
        ) {
            if ( rootElem.classList.contains( openClassName ) ) {
                panelElem.style.height = `${panelInnerElem.clientHeight}px`;

                setTimeout( () => {
                    panelElem.style.height = '0px';
                }, 100 );
            } else {
                rootElem.classList.add( openClassName );

                panelElem.style.height = '0px';

                setTimeout( () => {
                    panelElem.style.height = `${panelInnerElem.clientHeight}px`;
                }, 100 );
            }
        }
    }, [] );

    const transitionendHandler: TransitionEventHandler = useCallback( () => {
        const rootElem = rootRef.current;
        const panelElem = panelRef.current;

        if (
            rootElem &&
            panelElem
        ) {
            if ( panelElem.style.height === '0px' ) {
                rootElem.classList.remove( openClassName );
            } else {
                panelElem.style.height = 'auto';
            }
        }
    }, [] );

    return (
        <dl className="m-disclosure" ref={rootRef}>
            <dt className="disclosure__title">
                <button
                    className="disclosure__btn"
                    type="button"
                    onClick={btnClickHandler} >{title}</button>
            </dt>
            <dd className="disclosure__panel" ref={panelRef} onTransitionEnd={transitionendHandler}>
                <div className="disclosure__panelInner" ref={panelInnerRef}>
                    { children }
                </div>
            </dd>
        </dl>
    )
} );

export { Disclosure };
