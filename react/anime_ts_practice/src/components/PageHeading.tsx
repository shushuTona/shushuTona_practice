import { memo } from 'react';
import PageHeadingCssClassList from '@/styles/components/PageHeading.module.scss';

interface Props {
    text: string
}

const PageHeading = memo( ( { text }: Props ) => {
    return (
        <h1 className={PageHeadingCssClassList.pageHeading}>{ text }</h1>
    )
} );

export { PageHeading };
