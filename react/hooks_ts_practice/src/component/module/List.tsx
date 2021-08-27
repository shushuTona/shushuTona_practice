import { memo } from 'react';

import './css/List.css';

interface Props {
    textList: string[]
}

const List = memo( ( { textList }: Props ) => {
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

export { List };
