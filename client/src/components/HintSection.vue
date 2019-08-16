<template>
  <div class="container">
    <h6 STYLE="color: white; text-align: left">Hints Left: {{20 - game.questions.length}}</h6>
    <div style="overflow: auto; height:70%; padding-bottom: 0px;">

    <Hint style="margin: auto;" v-on:question-answered="optionSelected" v-for="question in game.questions"
          v-bind:question="question" :is-player-one="isPlayerOne"/>
    </div>
      <form id="ask-form" class="container ask-hint-body page-footer form-inline" @submit="$emit('question-asked', question)" v-if="!isPlayerOne && !game.ended">
        <input class="col-10 form-control" type="text" v-model="question" title="question" placeholder="type your question here" required/>
        <input class="col-2 btn btn-primary" type="submit" value="SEND"/>
      </form>
  </div>
</template>

<script>
  import Hint from './Hint.vue'

  export default {
    name: 'HintSection',
    components: {Hint},
    props: {
      game: Object,
      isPlayerOne: Boolean
    },
    data() {
      return {
        question: ''
      }
    },
    mounted() {
    },
    methods: {
      optionSelected(info) {
        this.$emit('question-answered', info);
      }
    }
  }

</script>
