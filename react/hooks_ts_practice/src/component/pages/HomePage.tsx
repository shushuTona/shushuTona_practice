import React from 'react';

const HomePage = React.memo( () => {
    console.log( 'HomePage' );

    return (
        <React.Fragment>
            <h1>Home</h1>
        </React.Fragment>
    );
} );

export { HomePage };
