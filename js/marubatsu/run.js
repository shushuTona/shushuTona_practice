// ①：手番の人が残っているボタンを押す
// ②：ボタンに手番の人のマークを表示する＆そのボタンを押せなくする（非活性）
// ③：勝敗の確認
    // ・勝敗がついていたら → 勝者を表示して、全てのボタンを押せなくする
    // ・勝敗がついていない＆まだマスが残っている → 手番を切り替えて①の処理に戻る
    // ・勝敗がついていない＆もう押せるマスが残ってない → 引き分け表示

let tebanA = true;
const items = document.querySelectorAll( '.box button' );
const checkMarkArray = [];
const winner = document.querySelector( '.text' );
const text = document.querySelector( '.teban' );

text.textContent = tebanA ? '〇' : '✖';

const changeAllDisabled = function(mark) {
    items.forEach( function( btn ) {
        btn.disabled = true;
    } );

    winner.textContent = `勝者は${mark}`;
}

const checkMatch = function() {
    const mark = tebanA ? '〇' : '✖';

    // 横
    if (
        checkMarkArray[ 0 ] === mark &&
        checkMarkArray[ 1 ] === mark &&
        checkMarkArray[ 2 ] === mark
    ) {
        changeAllDisabled(mark);
        return;
    }

    if (
        checkMarkArray[ 3 ] === mark &&
        checkMarkArray[ 4 ] === mark &&
        checkMarkArray[ 5 ] === mark
    ) {
        changeAllDisabled(mark);
        return;
    }

    if (
        checkMarkArray[ 6 ] === mark &&
        checkMarkArray[ 7 ] === mark &&
        checkMarkArray[ 8 ] === mark
    ) {
        changeAllDisabled(mark);
        return;
    }

    // 縦
    if (
        checkMarkArray[ 0 ] === mark &&
        checkMarkArray[ 3 ] === mark &&
        checkMarkArray[ 6 ] === mark
    ) {
        changeAllDisabled(mark);
        return;
    }

    if (
        checkMarkArray[ 1 ] === mark &&
        checkMarkArray[ 4 ] === mark &&
        checkMarkArray[ 7 ] === mark
    ) {
        changeAllDisabled(mark);
        return;
    }

    if (
        checkMarkArray[ 2 ] === mark &&
        checkMarkArray[ 5 ] === mark &&
        checkMarkArray[ 8 ] === mark
    ) {
        changeAllDisabled(mark);
        return;
    }

    // ななめ
    if (
        checkMarkArray[ 0 ] === mark &&
        checkMarkArray[ 4 ] === mark &&
        checkMarkArray[ 8 ] === mark
    ) {
        changeAllDisabled(mark);
        return;
    }

    if (
        checkMarkArray[ 2 ] === mark &&
        checkMarkArray[ 4 ] === mark &&
        checkMarkArray[ 6 ] === mark
    ) {
        changeAllDisabled(mark);
        return;
    }

    console.log( 'まだまだ勝負は終わらない' );
    tebanA = !tebanA;
    text.textContent = tebanA ? '〇' : '✖';
}

for ( let i = 0; i < items.length; i++ ) {
    const btn = items[ i ];

    btn.addEventListener( 'click', function() {
        if ( tebanA ) {
            btn.textContent = '〇';
            checkMarkArray[ i ] = '〇';
        } else {
            btn.textContent = '✖';
            checkMarkArray[ i ] = '✖';
        }

        btn.disabled = true;

        // 勝敗判定
        checkMatch();
    } );
}
