import { memo } from 'react';

import './css/Heading.css';

type headingGroup = ( 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' );
interface Props  {
    text: string,
    htmlHeadingTag: keyof JSX.IntrinsicElements & headingGroup
}

const Heading = memo( ( { text, htmlHeadingTag }: Props ) => {
    console.log( 'Heading' );

    const CustomTag = htmlHeadingTag;

    return (
        <CustomTag className="m-heading"><span>{ text }</span></CustomTag>
    );
} );

export { Heading };
