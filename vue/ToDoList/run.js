( () => {
    'use strict';

    // textAreaでリスト入力部分
    const addItemArea = {
        template: `
            <div class="addItemArea">
                <input class="addItemArea__input" type="text" v-model="inputValue" v-on:keyup.enter="addItemHandler">
                <button class="addItemArea__btn" type="button" v-on:click="addItemHandler">add item</button>
            <!-- /.addItemArea --></div>
        `,
        data() {
            return {
                inputValue: '',
                itemFlag: false
            }
        },
        methods: {
            addItemHandler: function() {
                this.$emit( 'add-item', {
                    text: this.inputValue
                } );
                this.inputValue = '';
            }
        },
    }

    // リストアイテムモジュール
    const toDoArea = {
        template: `
            <div class="toDoArea">
                <ul>
                    <li v-if="toDoList.length === 0">なにもやることないです。</li>
                    <li v-for="(item, index) in toDoList" v-bind:key="index" v-on:click="itemClickHandler(index, $event)">{{ item.text }}</li>
                </ul>
            <!-- /.toDoArea --></div>
        `,
        props: [ 'toDoList' ],
        methods: {
            itemClickHandler: function( listItemNum, event ) {
                event.target.classList.toggle( 'is-active' );

                this.$emit( 'item-click', listItemNum );
            }
        },
    }

    // 削除ボタン
    const deleteItemBtn = {
        template: `<button v-show="deleteFlag" class="deleteItemBtn" v-on:click="clickHandler" type="button">delete</button>`,
        props: [ 'deleteFlag', 'deleteArry' ],
        methods: {
            clickHandler: function() {
                this.$emit( 'item-delete', this.deleteArry);
            }
        }
    }

    // インスタンス作成
    const vm = new Vue( {
        el: '#toDoList',
        data: {
            toDoList: [],
            deleteItem: [],
            deleteFlag: false
        },
        methods: {
            addToDoListItem: function( arry ) {
                this.toDoList.push( arry );
            },
            itemClick: function( listItemNum ) {
                this.deleteFlag = true;
                if ( this.deleteItem.indexOf( listItemNum ) === -1 ) {
                    // this.deleteItem.push( listItemNum );
                    console.log( listItemNum);

                    this.$set( this.deleteItem, this.deleteItem.length, listItemNum );
                } else {
                    console.log( listItemNum);
                    this.$delete( this.deleteItem, listItemNum);
                }

                this.deleteItem.sort( (a, b) => {
                    return b - a;
                } );

                console.log( this.deleteItem );
            },
            itemDelete: function( deleteArry ) {
                for ( let index = 0; index < deleteArry.length; index++ ){
                    this.$delete( this.toDoList, deleteArry[ index ] );
                }

                document.querySelectorAll( '.toDoArea li' ).forEach( ( item ) => {
                    item.classList.remove( 'is-active' );
                } );

                this.deleteItem = [];
                this.deleteFlag = false;
            }
        },
        components: {
            'add-item-area': addItemArea,
            'to-do-area': toDoArea,
            'delete-item-btn': deleteItemBtn
        }
    } );
} )();