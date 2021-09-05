import {
    memo,
    Fragment,
    useState,
    useRef,
    useCallback,
    MouseEventHandler
} from 'react';
import {
    CSSTransition,
    SwitchTransition
} from 'react-transition-group';
import { PageHeading } from '@/components/PageHeading';
import { Button } from '@/components/Button';
import SwitchTransitionCssClassList from '@/styles/pages/SwitchTransition.module.scss';

const SwitchTransitionComp = memo( () => {
    const [state, setState] = useState( false );
    const nodeRef = useRef<HTMLDivElement>( null );

    const btnClickHandler: MouseEventHandler = useCallback( () => {
        setState( state => !state );
    }, [] );

    return (
        <Fragment>
            <PageHeading text="SwitchTransition." />

            <div className={SwitchTransitionCssClassList.switchTransitionArea}>
                <Button text={state ? 'RED' : 'BLUE'} clickHandler={btnClickHandler} />

                <SwitchTransition mode="out-in">
                    <CSSTransition
                        key={state ? 'RED' : 'BLUE'}
                        classNames={{
                            enter: SwitchTransitionCssClassList.switchTransitionEnter,
                            enterActive: SwitchTransitionCssClassList.switchTransitionEnterActive,
                            exit: SwitchTransitionCssClassList.switchTransitionExit,
                            exitActive: SwitchTransitionCssClassList.switchTransitionExitActive,
                        }}
                        nodeRef={nodeRef}
                        addEndListener={( done: () => void ) => {
                            if ( nodeRef && nodeRef.current ) {
                                nodeRef.current.addEventListener( 'transitionend', done, false );
                            }
                        }}
                    >
                        <div
                            ref={nodeRef}
                            className={
                                [
                                    SwitchTransitionCssClassList.switchTransition,
                                    state ? SwitchTransitionCssClassList.red : SwitchTransitionCssClassList.blue
                                ].join( ' ' )
                            }>{state ? 'RED' : 'BLUE'}</div>
                    </CSSTransition>
                </SwitchTransition>
            </div>
        </Fragment>
    );
} );

export default SwitchTransitionComp;
