const cacheName = 'v1';
const cacheList = [
    '/index.html',
    '/run.js',
    'img/img1.jpg',
    'img/img2.png'
];

self.addEventListener( 'install', ( event ) => {
    // ExtendableEvent.waitUntil()
    // waitUntilの中のコードが成功するまで、サービスワーカーがインストールされないことを保証する。
    console.log( event );

    event.waitUntil(
        caches.open( cacheName )
            .then( ( cache ) => {
                return cache.addAll( cacheList );
            })
    );
} );

// ServiceWorkerが更新された際に前のcashを削除する処理
self.addEventListener( 'activate', ( event ) => {
    const cachedList = [ cacheList ];

    event.waitUntil(
        caches.keys()
            .then( ( cacheNameList ) => {
                return Promise.add(
                    cacheNameList.map( ( cacheName ) => {
                        if ( cachedList.indexOf( cacheName ) === -1 ) {
                            return caches.delete( cacheName );
                        }
                    })
                )
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

                        caches.open( cacheName )
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
