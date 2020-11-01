new Vue( {
    el: '#animated-number-demo',
    data: {
        number: 0,
        animatedNumber: 0
    },
    watch: {
        number: function( newValue, oldValue ) {
            let timer = null;
            let counter = 0;

            const plusNumber = () => {
                counter++;
                this.animatedNumber = oldValue + counter;

                if ( this.animatedNumber < newValue) {
                    timer = setTimeout(() => {
                        plusNumber();
                    }, 50);
                } else {
                    clearTimeout( timer );
                    timer = null;
                    this.animatedNumber = newValue;
                    return;
                }
            }

            const minusNumber = () => {
                counter++;
                this.animatedNumber = oldValue - counter;

                if ( this.animatedNumber > newValue) {
                    timer = setTimeout(() => {
                        minusNumber();
                    }, 50);
                } else {
                    clearTimeout( timer );
                    timer = null;
                    this.animatedNumber = newValue;
                    return;
                }
            }

            if ( newValue > oldValue ) {
                plusNumber();
            } else {
                minusNumber();
            }
        }
    }
} );