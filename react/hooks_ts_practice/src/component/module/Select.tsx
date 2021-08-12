import { memo, ChangeEventHandler } from 'react';
import './css/Select.css';

interface Props {
    readonly options: string[],
    selectValue: string,
    labelText: string,
    changeInputHandler: ChangeEventHandler
}

const Select = memo( ( { options, selectValue, labelText, changeInputHandler }: Props) => {
    return (
        <label className="m-select">
            <select className="select__inner" defaultValue={selectValue} onChange={changeInputHandler}>
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
