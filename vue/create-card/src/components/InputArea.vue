<template>
    <div class="m_inputArea" :class="{ 'of-reverse': reverseFlag }">
        <div class="inputArea__front">
            <InputCardValue
                label="name"
                placeholder="tanaka taro"
                :value="inputObj.name"
                :maxlength="20"
                @inputCardValue="inputCardValueHandler"
                :disabled="reverseFlag"
            />
        </div><!-- /.inputArea__front -->

        <div class="inputArea__back">
            <InputCardValue
                label="birthday"
                placeholder="2020.1.1"
                :value="inputObj.birthday"
                :maxlength="10"
                @inputCardValue="inputCardValueHandler"
                :disabled="!reverseFlag"
            />
        </div><!-- /.inputArea__back -->
    </div><!-- /.m_inputArea -->
</template>

<script>
import InputCardValue from './InputCardValue.vue';

export default {
    name: 'InputArea',
    props: [
        'inputObj',
        'reverseFlag'
    ],
    methods: {
        inputCardValueHandler(emitObj) {
            this.$emit('input-area', emitObj);
        }
    },
    components: {
        InputCardValue,
    }
}
</script>

<style>
    .m_inputArea {
        margin: 0 auto;
        max-width: 500px;
    }

    .inputArea__front,
    .inputArea__back {
        padding: 20px;
        border: 1px solid #333;
        border-radius: 15px;
        transition: opacity .3s;
    }

    .inputArea__back {
        margin-top: 25px;
        opacity: .2;
    }

    .m_inputArea.of-reverse .inputArea__front {
        opacity: .2;
    }

    .m_inputArea.of-reverse .inputArea__back {
        opacity: 1;
    }
</style>