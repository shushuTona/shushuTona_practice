<template>
    <div class="m_card" :class="rootClass">
        <div class="card__front">
            <div class="card__inner">
                <p class="card__hdg">Point Card</p>
                <p class="card__num"><span class="card_disc">ID</span> : {{ card_num }}</p>
                <p class="card__name"><span class="card_disc">name</span> : {{ card_name }}</p>
            </div>
        </div>
        <div class="card__back">
            <div class="card__inner">
                <p class="card__birthday"><span class="card_disc">birthday</span> : {{ card_birthday }}</p>
                <p class="card__registration"><span class="card_disc">Registration date</span> : {{ card_date }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ShowCard',
    props: {
        inputCard_num: Number,
        card_name: String,
        card_birthday: String,
        reverseFlag: Boolean
    },
    computed: {
        rootClass() {
            return {
                'of-back': this.reverseFlag,
            }
        },
        card_num() {
            return this.inputCard_num;
        },
        card_date() {
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate().toString();
            const showDate = `${year}.${month}.${day.padStart(2, '0')}`;

            return showDate;
        }
    },
}
</script>

<style scoped>
.m_card {
    margin: 50px auto;
    perspective: 150em;
    height: 150px;
    position: relative;
}

.card__front,
.card__back {
    margin: 0 auto;
    padding: 15px;
    width: 100%;
    max-width: 300px;
    height: 100%;
    border-radius: 15px;
    box-shadow: 0px 5px 10px 3px rgba(0, 0, 0, .2);
    backface-visibility: hidden;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    transition: transform .5s;
}

.card__front {
    background-color: #1ec776;
}

.card__front::before {
    content: "";
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 0 0 100% 0 / 0 0 100% 0;
    position: absolute;
    top: -60px;
    left: 0;
}

.card__back {
    background-color: #666;
    transform:rotateY(180deg);
}

.m_card.of-back .card__front {
    transform:rotateY(180deg);
}

.m_card.of-back .card__back {
    transform:rotateY(0deg);
}

.card__inner {
    height: 100%;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    position: relative;
    z-index: 1;
}

.card__hdg {
    margin: 0;
    align-self: flex-start;
    color: #1ec776;
    font-size: 2rem;
}

.card__num,
.card__registration,
.card__name {
    margin: 5px 0 0;
}

.card__num,
.card__birthday {
    margin: auto 0 0;
}

.card_disc {
    font-size: 1.4rem;
}
</style>