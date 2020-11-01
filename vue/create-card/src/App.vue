<template>
  <div id="app">
    <ShowCard
      :inputCard_num="inputCard_num"
      :card_name="inputObj.name"
      :card_birthday="inputObj.birthday"
      :reverseFlag="reverseFlag"
    />

    <button
      class="m_reverseBtn"
      @click="reverseFlag = !reverseFlag"
    >Front ⇔ Back</button>

    <InputArea
      :input-obj="inputObj"
      :reverseFlag="reverseFlag"
      @input-area="inputAreaHandler"
    />

    <button class="m_completeBtn">create card</button>
  </div>
</template>

<script>
import ShowCard from './components/ShowCard.vue';
import InputArea from './components/InputArea.vue';

export default {
  name: 'App',
  data() {
    return {
      reverseFlag: false,
      inputCard_num: Math.floor(Math.random() * 99999),
      inputObj: {
        name: '',
        birthday: ''
      },
    }
  },
  methods: {
    inputAreaHandler(emitObj) {
      this.inputObj[emitObj.key] = emitObj.value;
    }
  },
  components: {
    ShowCard,
    InputArea,
  }
}
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}

body {
  margin: 0;
  padding: 0;
  color: #333;
  font-size: 1.6rem;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  padding: 50px 20px;
}

#app *:first-child {
  margin-top: 0;
}

#app *:last-child {
  margin-bottom: 0;
}

.m_reverseBtn,
.m_completeBtn {
  margin: 25px auto;
  padding: 10px 15px;
  display: block;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #333;
  line-height: 1;
  transition: box-shadow .3s, background-color .3s, color .3s;
  cursor: pointer;
}

.m_reverseBtn:hover {
  box-shadow: 0 0 15px 1px rgba(0, 0, 0, .1);
}

.m_completeBtn:focus,
.m_completeBtn:hover {
  color: #fff;
  border-color: #1ec776;
  background-color: #1ec776;
}
</style>
