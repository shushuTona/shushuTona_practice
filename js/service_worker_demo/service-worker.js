self.addEventListener( 'install', ( event ) => {
    // ExtendableEvent.waitUntil()
    // waitUntilの中のコードが成功するまで、サービスワーカーがインストールされないことを保証する。
    console.log( event );

    event.waitUntil(
        caches.open( 'v1' )
            .then( ( cache ) => {
                return cache.addAll( [
                    '/index.html',
                    '/run.js',
                    '/img/img1.jpg',
                    '/img/img2.png'
                ] );
            })
    );
} );

self.addEventListener( 'fetch', ( event ) => {
    console.log( event );

    event.respondWith(
        caches.match( event.request )
            .then( ( response ) => {
                return response || fetch( event.request )
                    .then( ( response ) => {
                        const responseClone = response.clone();

                        caches.open( 'v1' )
                            .then( ( cache ) => {
                                cache.put( event.request, responseClone );
                            } );

                        return response;
                    } );
            } )
            .catch( () => {
                return caches.match('/img/img1.jpg');
            } )
    );
} );
