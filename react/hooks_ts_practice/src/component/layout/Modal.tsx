import {
    memo,
    useContext,
    Suspense
} from 'react';

import { ModalStateContext } from '@/component/context/ModalContext';

import './css/Modal.css';

const Modal = memo( () => {
    console.log( 'Modal' );

    const modalContext = useContext( ModalStateContext );
    const { isModalShow, isModalHidden, modalContentsComponent } = modalContext.state;

    return (
        <div className={'m-modal' + ( isModalShow ? ' is-show' : '' ) + ( isModalHidden ? ' is-hidden' : '' )}>
            <div className="modal__contents">
                <Suspense fallback={<p>Loading...</p>}>
                    {
                        modalContentsComponent
                    }
                </Suspense>
            </div>
        </div>
    )
} );

export { Modal };
