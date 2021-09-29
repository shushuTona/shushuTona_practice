import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Btn } from '../../components/Btn';

const btnText = 'btn text';
const clickHandler = jest.fn( () => 100 ).mockName( 'clickHandlerMock' );
const Props = {
    btnText,
    clickHandler
}

test( 'Check Btn Component Text', () => {
    const RenderResult = render( <Btn {...Props} /> );
    expect( RenderResult.container.innerHTML ).toMatch( btnText );
} );

test( 'Check Btn Component Click Event', () => {
    const RenderResult = render( <Btn {...Props} /> );
    userEvent.click( RenderResult.getByText( btnText ) );
    expect( clickHandler ).toHaveBeenCalledTimes( 1 );
} );
