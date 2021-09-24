import { render, screen, fireEvent } from '@testing-library/react';
import { Btn } from '../../components/Btn';

test( 'click Btn component', () => {
    const btnText = 'btn text';
    const clickHandler = jest.fn();

    render( <Btn btnText={btnText} clickHandler={clickHandler} /> );
    fireEvent.click( screen.getByText( btnText ) );
    expect( clickHandler ).toBeCalled();
} );
