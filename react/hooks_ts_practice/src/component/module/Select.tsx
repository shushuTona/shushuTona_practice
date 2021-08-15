import {
    memo,
    ChangeEventHandler,
    RefObject
} from 'react';

import './css/Select.css';

interface Props {
    readonly options: string[],
    selectValue: string,
    labelText: string,
    defaultText: string,
    changeInputHandler: ChangeEventHandler,
    selectRef?: RefObject<HTMLSelectElement>
}

const Select = memo( ( { options, selectValue, labelText, defaultText, changeInputHandler, selectRef }: Props ) => {
    return (
        <label className="m-select">
            <select className="select__inner" defaultValue={selectValue} onChange={changeInputHandler} ref={selectRef}>
                <option defaultValue="">{defaultText}</option>
                {
                    options.map( ( optionItem ) => {
                        return <option
                            defaultValue={optionItem}
                            key={optionItem}
                        >{optionItem}</option>
                    } )
                }
            </select>
            <span className="select__label">{labelText}</span>
        </label>
    )
} );

export { Select };
