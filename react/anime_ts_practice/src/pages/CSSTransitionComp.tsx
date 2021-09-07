import {
    VFC,
    memo,
    Dispatch,
    SetStateAction,
    RefObject,
    MouseEventHandler,
    useState,
    useCallback,
    useRef
} from 'react';
import { CSSTransition } from 'react-transition-group';
import { PageHeading } from '@/components/PageHeading';
import { Button } from '@/components/Button';
import CSSTransitionCssClassList from '@/styles/pages/CSSTransition.module.scss';

interface AnimeItem {
    id: number,
    flag: boolean,
    flagSetter: Dispatch<SetStateAction<boolean>>,
    nodeRef: RefObject<HTMLParagraphElement>
}

const CSSTransitionComp: VFC = memo( () => {
    const timeout = {
        appear: 500,
        enter: 300,
        exit: 300,
    };
    const [inProp1, setInProp1] = useState( true );
    const [inProp2, setInProp2] = useState( true );
    const [inProp3, setInProp3] = useState( true );

    const cssClassNames = {
        appear: CSSTransitionCssClassList.cssTransitionAppear,
        appearActive: CSSTransitionCssClassList.cssTransitionAppearActive,
        appearDone: CSSTransitionCssClassList.cssTransitionAppearActive,
        enter: CSSTransitionCssClassList.cssTransitionEnter,
        enterActive: CSSTransitionCssClassList.cssTransitionEnterActive,
        enterDone: CSSTransitionCssClassList.cssTransitionEnterDone,
        exit: CSSTransitionCssClassList.cssTransitionExit,
        exitActive: CSSTransitionCssClassList.cssTransitionExitActive,
        exitDone: CSSTransitionCssClassList.cssTransitionExitDone
    }

    const animeItems: AnimeItem[] = [
        {
            id: 1,
            flag: inProp1,
            flagSetter: setInProp1,
            nodeRef: useRef<HTMLParagraphElement>( null )
        },
        {
            id: 2,
            flag: inProp2,
            flagSetter: setInProp2,
            nodeRef: useRef<HTMLParagraphElement>( null )
        },
        {
            id: 3,
            flag: inProp3,
            flagSetter: setInProp3,
            nodeRef: useRef<HTMLParagraphElement>( null )
        }
    ]

    const btnClickHandler: MouseEventHandler = useCallback( () => {
        setInProp1( ( prevState ) => {
            return !prevState;
        } );
    }, [] );

    const onEnteredHandler1 = useCallback( () => {
        console.log( 'onEntered' );
        setInProp2( true );
    }, [] );

    const onExitedHandler1 = useCallback( () => {
        console.log( 'onExited' );
        setInProp2( false );
    }, [] );

    const onEnteredHandler2 = useCallback( () => {
        console.log( 'onEntered' );
        setInProp3( true );
    }, [] );

    const onExitedHandler2 = useCallback( () => {
        console.log( 'onExited' );
        setInProp3( false );
    }, [] );

    return (
        <div>
            <PageHeading text="CSSTransition." />

            <Button text="Click to Enter" clickHandler={btnClickHandler} />

            <div className={CSSTransitionCssClassList.cssTransitionArea}>
                {
                    animeItems.map( ( { id, flag, nodeRef } ) => {
                        const props = {
                            in: flag,
                            appear: true,
                            nodeRef: nodeRef,
                            timeout: timeout,
                            classNames: cssClassNames,
                            ...( id === 1 && { onEntered: onEnteredHandler1 } ),
                            ...( id === 1 && { onExited: onExitedHandler1 } ),
                            ...( id === 2 && { onEntered: onEnteredHandler2 } ),
                            ...( id === 2 && { onExited: onExitedHandler2 } ),
                        };

                        return (
                            <CSSTransition
                                key={id}
                                {...props}
                            >
                                <p className={CSSTransitionCssClassList.cssTransition} ref={nodeRef}>CSSTransitionComp</p>
                            </CSSTransition>
                        )
                    } )
                }
            </div>
        </div>
    )
} );

CSSTransitionComp.displayName = 'CSSTransition Component';

export default CSSTransitionComp;
