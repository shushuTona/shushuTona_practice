import {
    memo,
    Fragment,
    useState,
    useRef
} from 'react';
import {
    CSSTransition,
    TransitionGroup
} from 'react-transition-group';
import { PageHeading } from '@/components/PageHeading';
import TransitionGroupCssClassList from '@/styles/pages/TransitionGroup.module.scss';

const TransitionGroupComp = memo( () => {
    const [items] = useState( [
        {
            id: 0,
            text: 'Hoge',
            nodeRef: useRef<HTMLParagraphElement>( null )
        },
        {
            id: 1,
            text: 'Piyo',
            nodeRef: useRef<HTMLParagraphElement>( null )
        },
        {
            id: 2,
            text: 'Fuga',
            nodeRef: useRef<HTMLParagraphElement>( null )
        }
    ] );

    return (
        <Fragment>
            <PageHeading text="TransitionGroup" />

            <TransitionGroup className={TransitionGroupCssClassList.transitionGroup}>
                {
                    items.map( ( { id, text, nodeRef } ) => {
                        return <CSSTransition
                            key={id}
                            in
                            appear={true}
                            nodeRef={nodeRef}
                            timeout={500}
                            classNames={{
                                appear: TransitionGroupCssClassList.itemAppear,
                                appearActive: TransitionGroupCssClassList.itemAppearActive,
                                appearDone: TransitionGroupCssClassList.itemAppearDone,
                            }}
                        >
                            <p ref={nodeRef}>{ text }</p>
                        </CSSTransition>
                    } )
                }
            </TransitionGroup>
        </Fragment>
    )
} );

export default TransitionGroupComp;
