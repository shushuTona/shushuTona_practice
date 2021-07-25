import React from 'react';

const GoalsPage = React.memo( () => {
    console.log( 'GoalsPage' );

    return (
        <React.Fragment>
            <h1>Personal goals</h1>
        </React.Fragment>
    );
} );

export { GoalsPage };
