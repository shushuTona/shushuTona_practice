import {
    memo,
    ChangeEventHandler
} from 'react';

export interface Props {
    labelText: string,
    inputType: inputType,
    inputValue: string,
    changeHandler: ChangeEventHandler
}

const TextInput = memo( ( { labelText, inputType, inputValue, changeHandler }: Props ) => {
    console.log( 'TextInput : ' + labelText );

    return (
        <div className="textInput">
            <label className="textInput__inner">
                <span className="textInput__label">{ labelText }</span>
                <input
                    className="textInput__input"
                    type={inputType}
                    min={ (inputType === 'number') ? 0 : undefined }
                    value={inputValue}
                    onChange={changeHandler} />
            </label>
        </div>
    )
} );

export { TextInput };
