<template>
  <div class="container" style="text-align: left; color: white;">
    <h5>Game Session Code: {{game.sessionCode}}</h5>
    <h6 v-if="game.hint">Hint: {{game.hint}}</h6>
    <h4>Answer word: {{game.answer}}</h4>
    <h6 style="text-align: left">Guesses</h6>

    <div class="container" v-for="guess in game.guesses" style="text-align: left; color: white">
      <p>{{guess}}</p>
    </div>
    <form class="container ask-hint-body page-footer form-inline" @submit="$emit('answer-sent', answer)" v-if="!isPlayerOne">
      <input class="col-10 form-control" type="text" v-model="answer" title="answer" placeholder="guess the word here" required/>
      <input class="col-2 btn btn-primary" type="submit" value="SEND"/>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'Play',
    props: {
      game: Object,
      isPlayerOne: Boolean
    },
    data() {
      return {
        answer: ''
      };
    },
  }
</script>
