import {
    VFC,
    memo
} from 'react';
import './css/List.css';

interface Props {
    textList: string[]
}

const List: VFC<Props> = memo( ( { textList } ) => {
    return (
        <ul className="m-list">
            {
                textList.map( ( text ) => {
                    return <li key={text} className="list__item">{ text }</li>
                } )
            }
        </ul>
    )
} );

List.displayName = 'List Component';

export { List };
