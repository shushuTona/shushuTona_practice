<template>
    <div class="m_cardInput">
        <label class="cardInput__inner">
            <span class="cardInput__labelText">{{ label }}</span>
            <input
                class="cardInput__input"
                type="text"
                :placeholder="placeholder"
                :value="value"
                @input="inputHandler"
                :maxlength="maxlength"
                :disabled="disabled"
            >
        </label>
    </div><!-- /.m_cardInput -->
</template>

<script>
export default {
    name: 'InputCardValue',
    props: [
        'value',
        'label',
        'placeholder',
        'maxlength',
        'disabled',
    ],
    methods: {
        inputHandler(e) {
            this.$emit('inputCardValue', {
                key: this.label,
                value: e.target.value,
            });
        }
    }
}
</script>

<style scoped>
.m_cardInput {
    display: block;
}

.m_cardInput + .m_cardInput {
    margin-top: 15px;
}

.cardInput__inner {
    display: inline-block;
}

.cardInput__labelText {
    padding: 0 10px 0 0;
    cursor: pointer;
}

.cardInput__input {
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #333;
    transition: background-color .3s;
}

.cardInput__input[disabled] {
    background-color: #999;
    border: 1px solid #333;
}

.cardInput__input:focus {
    outline: none;
    box-shadow: 0 0 3px 3px rgba(30, 199, 118, 0.1);
}
</style>