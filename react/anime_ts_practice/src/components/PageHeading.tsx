import {
    VFC,
    memo
} from 'react';
import PageHeadingCssClassList from '@/styles/components/PageHeading.module.scss';

interface Props {
    text: string
}

const PageHeading: VFC<Props> = memo( ( { text } ) => {
    return (
        <h1 className={PageHeadingCssClassList.pageHeading}>{ text }</h1>
    )
} );

PageHeading.displayName = 'PageHeading Component';

export { PageHeading };
