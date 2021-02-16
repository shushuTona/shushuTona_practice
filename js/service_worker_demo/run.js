if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register( '/service-worker.js', { scope: '/' } )
        .then( ( reg ) => {
            console.log( reg );
        } )
        .catch( ( err ) => {
            console.error( err );
        } );
}