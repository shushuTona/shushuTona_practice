import {
    VFC,
    memo,
    ChangeEventHandler
} from 'react';
import './css/TextInput.css';

interface Props {
    inputType: 'input' | 'textarea',
    inputValue: string,
    labelText: string,
    placeholder: string,
    changeInputHandler: ChangeEventHandler
}

const TextInput: VFC<Props> = memo( ( { inputType, inputValue, labelText, placeholder, changeInputHandler } ) => {
    console.log( 'TextInput' );

    return (
        <label className="m-textInput">
            {
                inputType === 'input' ?
                    <input
                        className="textInput__input"
                        type="text"
                        value={inputValue}
                        onChange={changeInputHandler}
                        placeholder={placeholder} /> :
                    <textarea
                        className="textInput__input"
                        value={inputValue}
                        onChange={changeInputHandler}
                        placeholder={placeholder} />
            }
            <span className="textInput__label">{labelText}</span>
        </label>
    )
} );

TextInput.displayName = 'TextInput Component';

export { TextInput };
