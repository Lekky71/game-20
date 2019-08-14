<template>
  <div>
    <Hint v-on:question-answered="optionSelected" v-for="question in game.questions" v-bind:question="question"/>

    <form class="container">
      <input class="col-10" type="text" v-model="question" title="question" placeholder="type your question here"/>
      <input class="col-2" type="button" value="SEND" @click="$emit('question-asked', question)"/>
    </form>
  </div>
</template>

<script>
  import Hint from './Hint.vue'
  export default {
    name: 'HintSection',
    components: {Hint},
    props: {
      game: Object
    },
    data() {
      return {
        question: ''
      }
    },
    mounted() {
      console.log(this.game);
    },
    methods: {
      optionSelected(info){
        this.$emit('question-answered', info);
      }
    }
  }

</script>
