import { memo, ChangeEventHandler } from 'react';
import './css/TextInput.css';

interface Props {
    inputType: 'input' | 'textarea',
    inputValue: string,
    labelText: string,
    changeInputHandler: ChangeEventHandler
}

const TextInput = memo( ( { inputType, inputValue, labelText, changeInputHandler }: Props ) => {
    console.log('TextInput');

    return (
        <label className="m-textInput">
            {
                inputType === 'input' ?
                    <input className="textInput__input" value={inputValue} onChange={changeInputHandler} type="text" /> :
                    <textarea className="textInput__input" value={inputValue} onChange={changeInputHandler} />
            }
            <span className="textInput__label">{labelText}</span>
        </label>
    )
} );

export { TextInput };
