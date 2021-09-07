import {
    VFC,
    memo
} from 'react';
import './css/Heading.css';

type headingGroup = ( 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' );
interface Props  {
    text: string,
    htmlHeadingTag: keyof JSX.IntrinsicElements & headingGroup
}

const Heading: VFC<Props> = memo( ( { text, htmlHeadingTag } ) => {
    console.log( 'Heading' );

    const CustomTag = htmlHeadingTag;

    return (
        <CustomTag className="m-heading"><span>{ text }</span></CustomTag>
    );
} );

Heading.displayName = 'Heading Component';

export { Heading };
