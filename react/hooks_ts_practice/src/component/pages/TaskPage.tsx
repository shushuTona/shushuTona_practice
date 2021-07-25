import React from 'react';

const TaskPage = React.memo( () => {
    console.log( 'TaskPage' );

    return (
        <React.Fragment>
            <h1>Task</h1>
        </React.Fragment>
    );
} );

export { TaskPage };
