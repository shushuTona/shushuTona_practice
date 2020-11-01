var vm = new Vue( {
    el: '#toggle',
    data: {
        panelHeight: 0,
        isOpen: false
    },
    methods: {
        clickHandler: function() {
            this.isOpen = !this.isOpen;
        },
        enter: function( el ) {
            this.panelHeight = el.clientHeight;
            el.style.height = '0px';

            setTimeout(() => {
                el.style.height = `${ this.panelHeight }px`;
            }, 100);
        },
        afterEnter: function(el) {
            el.style.height = 'auto';
        },
        beforeLeave: function( el ) {
            this.panelHeight = el.clientHeight;
        },
        leave: function(el) {
            el.style.height = `${ this.panelHeight }px`;
            setTimeout( () => {
                el.style.height = '0px';
            }, 100 );
        },
        afterLeave: function(el) {
            el.style.height = 'auto';
        }
    }
} );