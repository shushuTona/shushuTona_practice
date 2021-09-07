import {
    VFC,
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

const Select: VFC<Props> = memo( ( { options, selectValue, labelText, defaultText, changeInputHandler, selectRef } ) => {
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

Select.displayName = 'Select Component';

export { Select };
